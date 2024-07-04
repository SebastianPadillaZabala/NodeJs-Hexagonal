
export interface RequestBody {
  to: string;
  message: string;
}

export const exampleRequestBody: RequestBody = {
  to: '61381449',
  message: 'Esto es una prueba desde DismacBot',
};

export interface RequestBodyImage {
  to: string;
  message: string;
  image: string
}

export const exampleRequestBodyImage: RequestBodyImage = {
  to: '61381449',
  message: 'Hola!\nEsto es una publicidad de *Dismac*.\n¡Espero que estés bien!',
  image: 'images/publicidad.jpg'
};
