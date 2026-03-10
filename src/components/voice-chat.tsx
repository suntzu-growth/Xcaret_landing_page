"use client";

import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

export function VoiceChat() {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
      setIsConnecting(false);
    },
    onMessage: (message: any) => {
      console.log("Message from ElevenLabs:", message);
    },
    onError: (error: any) => {
      console.error("ElevenLabs Error:", error);
      setIsConnecting(false);
    },
  });

  const startConversation = useCallback(async () => {
    try {
      setIsConnecting(true);
      // Solicitar permisos de micrófono explícitamente primero si es necesario
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Obtener el signed URL desde nuestra API
      const response = await fetch("/api/get-signed-url");
      const { signedUrl } = await response.json();

      if (!signedUrl) throw new Error("No signed URL received");

      await conversation.startSession({
        signedUrl,
      });
    } catch (error: any) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
      const errorMessage = error.message || "Error desconocido";
      alert(`Error al iniciar el chat por voz: ${errorMessage}. Por favor, asegúrate de dar permisos de micrófono y que la configuración sea correcta.`);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isActive = conversation.status === "connected";
  const isBuffering = conversation.status === "connecting" || isConnecting;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-3 animate-in fade-in duration-1000 w-full px-4">
      {/* Three Column Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
        <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-lg">
          <img
            src="/xcaret-1.png"
            alt="Xe-Há"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>
        <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-lg">
          <img
            src="/xcaret-2.png"
            alt="Xcaret México"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>
        <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-lg">
          <img
            src="/xcaret-3.png"
            alt="Xenses por Xcaret"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <button
          onClick={isActive ? stopConversation : startConversation}
          disabled={isBuffering}
          className={`px-8 py-4 rounded-full text-white font-medium transition-all duration-300 shadow-xl flex items-center gap-3 ${isActive
              ? "bg-red-500 hover:bg-red-600 scale-105"
              : "bg-black hover:bg-gray-900 hover:scale-105"
            } ${isBuffering ? "opacity-80 cursor-wait" : "cursor-pointer"}`}
        >
          {isBuffering ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isActive ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
          <span>
            {isActive ? "Terminar conversación" : "Habla con un experto Xcaret"}
          </span>
        </button>

        {/* Status and Visualization */}
        <div className="text-center space-y-2 min-h-[60px]">
          <p className={`text-md font-medium transition-colors duration-300 ${isActive ? "text-green-600" : "text-gray-500"}`}>
            {isBuffering
              ? "Conectando con tu asesor..."
              : isActive
                ? "Te escucho... puedes hablar"
                : "Nuestro asesor IA está listo para ayudarte"}
          </p>

          {isActive && (
            <div className="flex justify-center items-center space-x-1 h-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1 bg-current rounded-full transition-all duration-150 ${conversation.isSpeaking ? "animate-bounce" : "h-1 opacity-20"
                    }`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: conversation.isSpeaking ? `${Math.random() * 100 + 40}%` : '4px'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
