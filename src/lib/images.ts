
  
  
  // Função para fazer o upload da imagem
  export async function uploadImage(signedUrl: string, file: File, type: string) {
    try {
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type, // Certifique-se de que o tipo de conteúdo está correto
            'Access-Control-Allow-Origin': 'https://localhost:5173'
        },
        body: file,
        });
  
        if (uploadResponse.ok) {
            console.log('Upload bem-sucedido!');
        } else {
            console.error('Erro no upload:', uploadResponse.statusText);
            const errorText = await uploadResponse.text();
            console.error('Detalhes do erro:', errorText);
        }
    } catch(error) {
      console.log(error);
    }
    
  };