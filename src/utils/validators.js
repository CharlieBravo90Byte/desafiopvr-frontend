// src/utils/validators.js
export const validateRut = (rut) => {
    // Eliminar puntos y guión
    const rutLimpio = rut.replace(/[.-]/g, '');
    
    // Obtener dígito verificador
    const dv = rutLimpio.slice(-1).toUpperCase();
    
    // Obtener cuerpo del RUT
    const rutNumerico = parseInt(rutLimpio.slice(0, -1), 10);
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    // Calcular suma
    let numero = rutNumerico;
    while (numero > 0) {
      suma += (numero % 10) * multiplicador;
      numero = Math.floor(numero / 10);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    // Calcular dígito verificador esperado
    const dvEsperado = (11 - (suma % 11)).toString();
    const dvCalculado = dvEsperado === '11' ? '0' : dvEsperado === '10' ? 'K' : dvEsperado;
    
    return dvCalculado === dv;
  };