const db = require("../models");
const {locals} = require("express/lib/application");
const Peep = db.peep;

exports.getAllPeeps = async (req, res) => {
    try {
        const peeps = await Peep.findAll();
        res.send(peeps);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllPeepsForCurrentUser = async (req, res) => {
    try {
        const peeps = await Peep.findAll({
            where: {
                userKey: req.userId,
            },
        });
        res.send(peeps);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllPeepsForOwner = async (req, res) => {
    // check if owner already
    let key = -1;
    if (req.ownerId === 0) {
        console.log("ownerId " + req.ownerId);
        key = req.userId;
    } else {
        key = req.ownerId;
        console.log("ownerId " + req.ownerId);
    }

    // get peeps
    try {
        const peeps = await Peep.findAll({
            where: {
                userKey: key,
            },
        });
        res.send(peeps);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getPeep = async (req, res) => {
    try {
        const peep = await Peep.findByPk(req.params.id);
        if (!peep) {
            return res.status(404).json({ error: 'Peep not found' });
        }
        return res.json(peep);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.createPeep = async (req, res) => {
}

exports.updatePeep = async (req, res) => {
}

exports.deletePeep = async (req, res) => {
    try {
        const peep = await Peep.findByPk(req.params.id);
        if (!peep) {
            return res.status(404).json({ error: 'Peep not found to be deleted' });
        }
        await peep.destroy()
        return res.status(204);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteAllPeeps = async (req, res) => {
    try {
        Peep.destroy({
            truncate: true // maybe?
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

