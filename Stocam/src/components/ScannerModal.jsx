import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

const ScannerModal = () => {
  const videoRef = useRef(null);
  const resultRef = useRef(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    // Configura hints para priorizar DataMatrix
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.DATA_MATRIX]);

    codeReader.current = new BrowserMultiFormatReader(hints);

    // Lista dispositivos de vídeo (câmeras)
    codeReader.current.listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
          const sourceSelect = document.getElementById('sourceSelect');
          if (sourceSelect) {
            sourceSelect.innerHTML = ''; // Limpa opções
            videoInputDevices.forEach((device) => {
              const option = document.createElement('option');
              option.value = device.deviceId;
              option.text = device.label || `Câmera ${device.deviceId}`;
              sourceSelect.appendChild(option);
            });
            document.getElementById('sourceSelectPanel').style.display = 'block';
          }
        }
      })
      .catch((err) => console.error('Erro ao listar câmeras:', err));

    // Cleanup ao desmontar o componente
    return () => {
      codeReader.current.reset();
    };
  }, []);

  const handleStartScan = () => {
    if (selectedDeviceId && videoRef.current) {
      codeReader.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
        if (result) {
          console.log('Código DataMatrix lido:', result.text);
          if (resultRef.current) {
            resultRef.current.textContent = result.text;
          }
          // Pare o scan se quiser após ler (opcional)
          // codeReader.current.reset();
        }
        if (err && !(err.name === 'NotFoundException')) {
          console.error('Erro no scan:', err);
          if (resultRef.current) {
            resultRef.current.textContent = 'Erro: ' + err.message;
          }
        }
      })
      .catch((err) => console.error('Erro ao iniciar scan:', err));
    } else {
      alert('Selecione uma câmera primeiro!');
    }
  };

  const handleReset = () => {
    codeReader.current.reset();
    if (resultRef.current) {
      resultRef.current.textContent = '';
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div style={{ padding: '2em', maxWidth: '600px', margin: 'auto' }}>
      <h1>Scanner DataMatrix com ZXing</h1>
      <p>Escaneie códigos DataMatrix usando a webcam.</p>
      <div>
        <button onClick={handleStartScan}>Iniciar Scan</button>
        <button onClick={handleReset}>Resetar</button>
      </div>
      <div id="sourceSelectPanel" style={{ display: 'none', margin: '1em 0' }}>
        <label htmlFor="sourceSelect">Selecione a câmera:</label>
        <select
          id="sourceSelect"
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        ></select>
      </div>
      <video ref={videoRef} style={{ width: '100%', border: '1px solid gray' }} />
      <label>Resultado:</label>
      <pre><code ref={resultRef}></code></pre>
    </div>
  );
};

export default ScannerModal;