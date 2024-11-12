const validateProduct = (req, res, next) => {
    const { name, type, carat, clarity, color, cut, rtsValue, brownInc, lab } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please provide name" });
    }

    if (!type) {
        return res.status(400).json({ message: "Please provide type" });
    }

    if (!carat) {
        return res.status(400).json({ message: "Please provide carat" });
    }

    if (!clarity) {
        return res.status(400).json({ message: "Please provide clarity" });
    }

    if (!color) {
        return res.status(400).json({ message: "Please provide color" });
    }

    if (!cut) {
        return res.status(400).json({ message: "Please provide cut" });
    }

    if (!rtsValue) {
        return res.status(400).json({ message: "Please provide rtsValue" });
    }

    if (!brownInc) {
        return res.status(400).json({ message: "Please provide brownInc" });
    }

    if (!lab) {
        return res.status(400).json({ message: "Please provide lab" });
    }

    next();
}

export { validateProduct };



