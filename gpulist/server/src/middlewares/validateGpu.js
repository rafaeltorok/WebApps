module.exports = (request, response, next) => {
    const errors = [];

    const body = request.body;
    if (!body.manufacturer?.trim()) errors.push("Manufacturer is required");
    if (!body.gpuline?.trim()) errors.push("GPU line is required");
    if (!body.model?.trim()) errors.push("Model is required");
    if (body.cores < 1) errors.push("Invalid core count");
    if (body.tmus < 1) errors.push("Invalid number of TMUs");
    if (body.rops < 1) errors.push("Invalid number of ROPs");
    if (body.vram < 0.016) errors.push("Invalid amount of VRAM");
    if (body.bus < 1) errors.push("Invalid bus width");
    if (!body.memtype?.trim()) errors.push("Memory type is required");
    if (body.baseclock < 1) errors.push("Base clock must be at least 1 MHz");
    if (body.boostclock < 1) errors.push("Boost clock must be at least 1 MHz");
    if (body.memclock < 0.1) errors.push("Memory clock must be at least 100 Mbps");

    if (errors.length > 0) {
        return response.status(400).json({ errors });
    }

    next();
};  