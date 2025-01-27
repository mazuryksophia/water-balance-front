import { Toaster } from 'react-hot-toast';

export const ToasterBar = () => {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ marginTop: 98 }}
      toastOptions={{
        style: {
          fontSize: 20,
          maxWidth: '800px',
          borderRadius: '24px',
          color: '#fff',
          duration: 4000,
        },
        success: {
          style: {
            background: '#669943',
          },
        },
        error: {
          icon: '🔥',
          style: {
            background: '#fc0335',
          },
        },
      }}
    />
  );
};
