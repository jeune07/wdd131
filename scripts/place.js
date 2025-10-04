// Footer details
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Static weather values for Haiti-like climate (metric)
const tempC = 29;    // warm Caribbean
const windKmh = 12;  // gentle breeze

document.querySelector("#temp").textContent = tempC;
document.querySelector("#wind").textContent = windKmh;

// One-line wind-chill (metric; returns °C rounded to 1 decimal)
// Note: In warm temps wind-chill is typically N/A; guard below handles that.
function calculateWindChillC(t, v) {
    return +(13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);
}

// Guard: only compute if T <= 10°C and wind > 4.8 km/h
const windChillEl = document.querySelector("#windchill");
if (tempC <= 10 && windKmh > 4.8) {
    windChillEl.textContent = `${calculateWindChillC(tempC, windKmh)} °C`;
} else {
    windChillEl.textContent = "N/A";
}
