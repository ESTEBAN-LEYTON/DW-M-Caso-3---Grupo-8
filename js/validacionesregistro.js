// --- Validación de RUT chileno ---
function validarRut(rut) {
  if (!/^[0-9]{7,8}-[0-9Kk]{1}$/.test(rut)) return false;
  let [numero, dv] = rut.split("-");
  dv = dv.toUpperCase();

  let suma = 0, multiplo = 2;
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(numero.charAt(i));
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  let resto = 11 - (suma % 11);
  let dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();

  return dv === dvEsperado;
}

// --- Validación correo ---
function validarCorreo(correo) {
  return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(correo);
}

// --- Validación texto solo letras ---
function soloLetras(texto) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
}

// --- Validación teléfono (9 dígitos en Chile) ---
function validarTelefono(tel) {
  return /^[0-9]{9}$/.test(tel);
}

// --- Calcular fecha término ---
function calcularFechaTermino() {
  const inicio = document.getElementById("fecha_inicio").value;
  const tipo = document.getElementById("tipo_practica").value;
  if (inicio && tipo) {
    const fecha = new Date(inicio);
    let horas = tipo === "laboral" ? 240 : 360;
    let dias = Math.ceil(horas / 8);
    fecha.setDate(fecha.getDate() + dias);
    document.getElementById("fecha_termino").value = fecha.toISOString().split("T")[0];
  }
}

// --- Mostrar error debajo de cada campo ---
function setError(id, mensaje) {
  document.getElementById(id).innerText = mensaje;
}

// --- Limpiar errores ---
function limpiarErrores() {
  document.querySelectorAll(".error").forEach(el => el.innerText = "");
}

// --- Validación completa del formulario ---
document.getElementById("formRegistro").addEventListener("submit", function(event) {
  event.preventDefault();
  limpiarErrores();

  let valido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const carrera = document.getElementById("carrera").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipoPractica = document.getElementById("tipo_practica").value;
  const fechaInicio = document.getElementById("fecha_inicio").value;
  const empresa = document.getElementById("empresa").value.trim();
  const jefe = document.getElementById("jefe").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correoEmpresa = document.getElementById("correo_empresa").value.trim();
  const foto = document.getElementById("foto").files[0];
  const documento = document.getElementById("documento").files[0];

  if (!soloLetras(nombre)) {
    setError("error-nombre", "El nombre solo puede contener letras y espacios.");
    valido = false;
  }

  if (!validarRut(rut)) {
    setError("error-rut", "El RUT no es válido. Ej: 21200157-0");
    valido = false;
  }

  if (!soloLetras(carrera)) {
    setError("error-carrera", "La carrera solo puede contener letras.");
    valido = false;
  }

  if (!validarCorreo(correo)) {
    setError("error-correo", "Correo personal inválido.");
    valido = false;
  }

  if (tipoPractica === "") {
    setError("error-tipo", "Debe seleccionar un tipo de práctica.");
    valido = false;
  }

  if (!fechaInicio) {
    setError("error-fecha", "Debe ingresar una fecha de inicio.");
    valido = false;
  }

  if (!empresa) {
    setError("error-empresa", "Debe ingresar la empresa.");
    valido = false;
  }

  if (!soloLetras(jefe)) {
    setError("error-jefe", "El nombre del jefe solo puede contener letras.");
    valido = false;
  }

  if (!validarTelefono(telefono)) {
    setError("error-telefono", "El teléfono debe tener 9 dígitos (ej: 987654321).");
    valido = false;
  }

  if (!validarCorreo(correoEmpresa)) {
    setError("error-correo-empresa", "Correo empresa inválido.");
    valido = false;
  }

  if (!foto) {
    setError("error-foto", "Debe subir una foto.");
    valido = false;
  } else {
    if (!["image/jpeg", "image/png"].includes(foto.type)) {
      setError("error-foto", "La foto debe ser JPG o PNG.");
      valido = false;
    }
    if (foto.size > 256 * 1024) {
      setError("error-foto", "La foto no debe superar los 256 KB.");
      valido = false;
    }
  }

  if (documento) {
    if (!["application/pdf", "application/msword", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(documento.type)) {
      setError("error-documento", "El documento debe ser PDF o Word.");
      valido = false;
    }
    if (documento.size > 1024 * 1024) {
      setError("error-documento", "El documento no debe superar 1 MB.");
      valido = false;
    }
  }

  if (valido) {
    alert("✅ Práctica registrada correctamente");
    this.reset();
    document.getElementById("fecha_termino").value = "";
  }
});

// --- Actualizar fecha término dinámicamente ---
document.getElementById("fecha_inicio").addEventListener("change", calcularFechaTermino);
document.getElementById("tipo_practica").addEventListener("change", calcularFechaTermino);
