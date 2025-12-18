export const validateDecimal = (el, options = {}) => {
    const {
        maxLength = 16,
        maxVal = null,
        minVal = null,
        maxDigit = 2,
    } = options;

    let value = el.value;

    // อนุญาตค่าว่าง
    if (value === "") return;

    // กันเกินความยาว
    if (maxLength && value.length > maxLength) {
        el.value = value.slice(0, maxLength);
        return;
    }

    // รูปแบบตัวเลข (ลบ + ทศนิยม)
    if (!/^-?\d*\.?\d*$/.test(value)) {
        el.value = value.slice(0, -1);
        return;
    }

    // แยกจำนวนเต็ม / ทศนิยม
    const [intPart, decimalPart = ""] = value.split(".");

    // จำกัดจำนวนทศนิยม
    if (maxDigit !== null && decimalPart.length > maxDigit) {
        el.value = intPart + "." + decimalPart.slice(0, maxDigit);
        return;
    }

    // ตรวจช่วงค่า
    const num = Number(el.value);
    if (!isNaN(num)) {
        if (maxVal !== null && num > maxVal) {
            el.value = maxVal;
            return;
        }
        if (minVal !== null && num < minVal) {
            el.value = minVal;
            return;
        }
    }
}


export const validateNumber = (el, options = {}) => {
    const {
        maxLength = 16,
        maxVal = null,
        minVal = null,
    } = options;

    let value = el.value;

    // อนุญาตค่าว่าง
    if (value === "") return;

    // อนุญาตเฉพาะตัวเลข, -, .
    if (!/^-?\d*\.?\d*$/.test(value)) {
        el.value = value.slice(0, -1);
        return;
    }

    // จำกัดความยาว
    if (maxLength && value.length > maxLength) {
        el.value = value.slice(0, maxLength);
        return;
    }

    // ถ้าเป็นแค่ - หรือ . ยังไม่ต้อง validate ช่วงค่า
    if (value === "-" || value === "." || value === "-.") return;

    const num = Number(value);
    if (isNaN(num)) return;

    // จำกัดค่าสูงสุด / ต่ำสุด
    if (maxVal !== null && num > maxVal) {
        el.value = maxVal;
        return;
    }

    if (minVal !== null && num < minVal) {
        el.value = minVal;
        return;
    }
}
