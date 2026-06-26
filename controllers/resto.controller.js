import pool from '../config/db.js'

export const getAllRestos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM restos');
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Aucun restaurant trouvé' });
        }

        res.status(200).json(result.rows);

        
    } catch (error) {
        console.error('Erreur lors de la récupération des restaurants :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des restaurants' });
    }
}

export const getRestoByID = async (req, res) => {
    try {

        const { id } = req.params;
        const result = await pool.query('SELECT * FROM restos WHERE id = $1', [id]);
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error('Erreur lors de la récupération du restaurant :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du restaurant' });
    }
}

export const updateRestoByID = async (req, res) => {
    try {

        const { id } = req.params;
        const restoData = req.body;

        if(!restoData.name || !restoData.address || !restoData.phone) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const existingResto = await pool.query('SELECT * FROM restos WHERE id = $1', [id]);
        if(existingResto.rows.length === 0) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        const result = await pool.query(
            'UPDATE restos SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
            [restoData.name, restoData.address, restoData.phone, id]
        );
        
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error('Erreur lors de la mise à jour du restaurant :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant' });
    }
}

export const createResto = async (req, res) => {
    try {
        const restoData = req.body;
        if(!restoData.name || !restoData.address || !restoData.phone) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const result = await pool.query(
            'INSERT INTO restos (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
            [restoData.name, restoData.address, restoData.phone]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Erreur lors de la création du restaurant :', error);
        res.status(500).json({ message: 'Erreur lors de la création du restaurant' });
    }
}

export const deleteRestoByID = async (req, res) => {
    try {

        const { id } = req.params;
        const existingResto = await pool.query('SELECT * FROM restos WHERE id = $1', [id]);

        if(existingResto.rows.length === 0) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        const result = await pool.query('DELETE FROM restos WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({ message: 'Restaurant supprimé avec succès' });

    } catch (error) {
        console.error('Erreur lors de la suppression du restaurant :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' });
    }
}