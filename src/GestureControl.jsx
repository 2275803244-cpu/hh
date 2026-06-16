import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Camera, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function GestureControl() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState('idle');
  const [cursor, setCursor] = useState(null);
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (landmarkerRef.current) { landmarkerRef.current.close(); landmarkerRef.current = null; }
    if (videoRef.current) { videoRef.current.srcObject = null; }
    setStatus('idle');
    setCursor(null);
  }, []);

  const startCamera = useCallback(async () => {
    setStatus('loading');
    try {
      const vision = await FilesetResolver.forVisionTasks('/hh/wasm/');
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 1
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 320, height: 240 }
      });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute('playsinline', '');
      await videoRef.current.play();
      setStatus('ready');

      let lastTime = 0;
      const detect = (now) => {
        if (!landmarkerRef.current || !videoRef.current) { animRef.current = requestAnimationFrame(detect); return; }
        if (videoRef.current.readyState >= 2 && now - lastTime > 60) {
          const result = landmarkerRef.current.detectForVideo(videoRef.current, now);
          if (result.landmarks && result.landmarks.length > 0) {
            const tip = result.landmarks[0][8];
            setCursor({
              x: (1 - tip.x) * window.innerWidth,
              y: tip.y * window.innerHeight
            });
          } else {
            setCursor(null);
          }
          lastTime = now;
        }
        animRef.current = requestAnimationFrame(detect);
      };
      animRef.current = requestAnimationFrame(detect);
    } catch (err) {
      console.error('GestureControl error:', err);
      setStatus('error');
    }
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      stopCamera();
      setEnabled(false);
    } else {
      setEnabled(true);
      startCamera();
    }
  }, [enabled, startCamera, stopCamera]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <>
      <button
        className={`gestureToggle${enabled ? ' isActive' : ''}${status === 'error' ? ' isError' : ''}`}
        onClick={toggle} type="button" title={enabled ? '关闭手势' : '开启手势'}
      >
        {status === 'loading' ? <span className="gestureLoading" /> : enabled ? <X size={20} /> : <Camera size={20} />}
      </button>

      {cursor && (
        <div className="fingerCursor" style={{ left: cursor.x, top: cursor.y }}>
          <div className="fingerCursorDot" />
          <div className="fingerCursorRing" />
        </div>
      )}

      <video ref={videoRef} style={{ display: 'none' }} />
    </>
  );
}