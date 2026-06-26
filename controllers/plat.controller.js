import pool from '../config/db.js'
export const getAllPlats = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM plats WHERE disponibilite = true');
        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des plats :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des plats' });
    }
}

export const getPlatByID = async (req, res) => {
    try {

        const { id } = req.params;
        const result = await pool.query('SELECT * FROM plats WHERE id = $1', [id]);
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error('Erreur lors de la récupération du plat :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du plat' });
    }
}

export const createPlat = async (req, res) =>  {
    try {
        const platData = req.body;

        if(!platData) {
            return res.status(400).json({ message: 'Données du plat manquantes' });
        }

        const result = await pool.query('INSERT INTO plats (nom, description, prix, disponibilite) VALUES ($1, $2, $3, $4) RETURNING *',
            [platData.nom, platData.description, platData.prix, platData.disponibilite]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de la création du plat :', error);
        res.status(500).json({ message: 'Erreur lors de la création du plat' });
    }

}

export const updatePlatByID = async (req, res) => {
    try {

        const { id } = req.params;
        const platData = req.body;

        if(!platData) {
            return res.status(400).json({ message: 'Données du plat manquantes' });
        }

        const existingPlat = await pool.query('SELECT * FROM plats WHERE id = $1', [id]);
        if(existingPlat.rows.length === 0) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        const result = await pool.query('UPDATE plats SET nom = $1, description = $2, prix = $3, disponibilite = $4 WHERE id = $5 RETURNING *',
            [platData.nom, platData.description, platData.prix, platData.disponibilite, id]
        );

        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour du plat :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du plat' });
        
    }
}

export const deletePlatByID = async (req, res) => {
    try {
        const { id } = req.params;

        const existingPlat = await pool.query('SELECT * FROM plats WHERE id = $1', [id]);
        if(existingPlat.rows.length === 0) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        await pool.query('DELETE FROM plats WHERE id = $1', [id]);
        res.status(200).json({ message: 'Plat supprimé avec succès' });

    } catch (error) {
        console.error('Erreur lors de la suppression du plat :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du plat' });
    }
}