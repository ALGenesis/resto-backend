import pool from '../config/db.js';

export const getAllPersonnel = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM personnel')
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Aucun personnel trouvé' })
        }

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erreur lors de la récupération du personnel:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const getPersonnelByID = async (req, res) => {
    try {

        const { id } = req.params
        const result = await pool.query('SELECT * FROM personnel WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Personnel non trouvé' })
        }

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erreur lors de la récupération du personnel:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const createPersonnel = async (req, res) =>  {
    try {

        const personnelData = req.body

        const existingPersonnel = await pool.query('SELECT * FROM personnel WHERE tel = $1', [personnelData.phone])
        if (existingPersonnel.rows.length > 0) {
            return res.status(400).json({ message: 'Un personnel avec ce numéro de téléphone existe déjà' })
        }

        const result = await pool.query('INSERT INTO personnel (nom, prenom, tel, email) VALUES ($1, $2, $3, $4) RETURNING *', [
            personnelData.lastName,
            personnelData.firstName,
            personnelData.phone,
            personnelData.email
        ])

        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error('Erreur lors de la création du personnel:', error)
        res.status(500).json({message : 'Erreur serveur'})
    }
}

export const updatePersonnelByID = async (req, res) => {
    try {
        const {id } = req.params
        const personnelData = req.body

        if(!personnelData) {
            res.status(500).json({message : "Remplir les champs "})
        }

        const existingPersonnel = await pool.query('SELECT * FROM personnel WHERE id = $1', [id])
        if(existingPersonnel.rows.length === 0) {
            return res.status(404).json({ message: 'Personnel non trouvé' })
        }

        const result = await pool.query('UPDATE personnel SET nom = $1, prenom = $2, tel = $3, email = $4 WHERE id = $5 RETURNING *', [
            personnelData.lastName,
            personnelData.firstName,
            personnelData.phone,
            personnelData.email,
            id
        ])

        res.status(200).json(result.rows[0])


    } catch (error) {
        console.error('Erreur lors de la mise à jour du personnel:', error)
        res.status(500).json({message : 'Erreur serveur'})
    }
}

export const deletePersonnelByID = async (req, res) => {
    try {

        const { id } = req.params
        const existingPersonnel = await pool.query('SELECT * FROM personnel WHERE id = $1', [id])

        if(existingPersonnel.rows.length === 0) {
            return res.status(404).json({ message: 'Personnel non trouvé' })
        }

        const result = await pool.query('DELETE FROM personnel WHERE id = $1', [id])
        res.status(200).json({ message: 'Personnel supprimé avec succès' })

    } catch (error) {
        console.error('Erreur lors de la suppression du personnel:', error)
        res.status(500).json({message : 'Erreur serveur'})
    }
}