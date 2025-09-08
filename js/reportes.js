// Datos de ejemplo para cada semestre
const datosSemestres = {
    1: [70, 10, 20, 40],
    2: [15, 55, 35, 75],
    3: [5, 15, 75, 15]
};

const ctx = document.getElementById("reportChart").getContext("2d");
let chart;

// Escuchar clic en las celdas de semestre
document.querySelectorAll(".semestre").forEach(celda => {
    celda.addEventListener("click", () => {
        const semestre = celda.dataset.semestre;
        actualizarGrafico(semestre);
    });
});

function actualizarGrafico(semestre) {
    const datos = datosSemestres[semestre];

    if (chart) chart.destroy(); // destruir el gráfico anterior

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril"],
            datasets: [{
                label: `Reporte Semestre ${semestre}`,
                data: datos,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
}
