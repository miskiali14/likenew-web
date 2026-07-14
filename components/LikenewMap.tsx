"use client";

import React from 'react';

const LikenewMap: React.FC = () => {
  // Koodhkii rasmiga ahaa ee LikeNew ee aad Yandex ka soo saartay
  const yandexEmbedUrl = "https://yandex.com/map-widget/v1/?um=constructor%3Adf7181c21e5867729ab1c04bc77a05fb17f3c33b47d4c36ad9bf0c76c7b39787&source=constructor";

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '20px',
      border: '3px solid #662d8f', // Midabkaaga rasmiga ah (Primary Purple)
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(102, 45, 143, 0.12)',
      backgroundColor: '#ffffff',
    }}>
      {/* Cinwaanka LikeNew Locker */}
      <h3 style={{
        color: '#825bac', // Midabkaaga rasmiga ah (Secondary Purple)
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'sans-serif',
      }}>
        📍 Find Our Locker at Waaberi Road
      </h3>

      {/* Sanduuqa Khariidada ee Responsive-ka ah */}
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '450px', // Dhererka khariidada
      }}>
        <iframe
          src={yandexEmbedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={true}
          loading="lazy"
          style={{
            display: 'block',
            border: 'none',
          }}
          title="LikeNew Waaberi Road Locker Location"
        />
      </div>
    </div>
  );
};

export default LikenewMap;