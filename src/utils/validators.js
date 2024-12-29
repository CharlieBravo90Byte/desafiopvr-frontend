/**
 * Módulo de Validación de RUT Chileno
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este módulo proporciona una función para validar el formato
 * y dígito verificador de un RUT chileno
 */

/**
 * Valida un RUT chileno verificando su dígito verificador
 * @param {string} rut - RUT a validar (formato: XX.XXX.XXX-X)
 * @returns {boolean} true si el RUT es válido, false en caso contrario
 * 
 * @example
 * validateRut('12.345.678-9'); // Retorna true o false
 * validateRut('11111111-1');   // Retorna true o false
 */
export const validateRut = (rut) => {
  // Remover caracteres no deseados (puntos y guión)
  const rutLimpio = rut.replace(/[.-]/g, '');
  
  // Extraer dígito verificador
  const dv = rutLimpio.slice(-1).toUpperCase();
  
  // Convertir cuerpo del RUT a número
  const rutNumerico = parseInt(rutLimpio.slice(0, -1), 10);
  
  // Variables para el cálculo
  let suma = 0;
  let multiplicador = 2;
  
  // Calcular suma ponderada
  let numero = rutNumerico;
  while (numero > 0) {
      // Multiplicar cada dígito por su factor correspondiente
      suma += (numero % 10) * multiplicador;
      
      // Avanzar al siguiente dígito
      numero = Math.floor(numero / 10);
      
      // Actualizar multiplicador (2,3,4,5,6,7)
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  // Calcular dígito verificador esperado
  const dvEsperado = (11 - (suma % 11)).toString();
  
  // Manejar casos especiales (11 -> 0, 10 -> K)
  const dvCalculado = dvEsperado === '11' ? '0' : 
                     dvEsperado === '10' ? 'K' : 
                     dvEsperado;
  
  // Comparar dígito calculado con el proporcionado
  return dvCalculado === dv;
};