import pool from '../config/db.js'

export const getAllClients = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM clients')
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Aucun client trouvé' })
        }

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const getClientByID = async (req, res) => {
    try {

        const { id } = req.params
        const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id])
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé' })
        }

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erreur lors de la récupération du client:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const createClient = async (req, res) =>  {
    try {
        const clientData = req.body

        const existingClient = await pool.query('SELECT * FROM clients WHERE tel = $1', [clientData.phone])
        if(existingClient.rows.length > 0) {
            return res.status(400).json({ message: 'Un client avec ce numéro de téléphone existe déjà' })
        }

        const result = await pool.query('INSERT INTO clients (name, firstname, phone) VALUES ($1, $2, $3) RETURNING *'
            , [clientData.name, clientData.firstname, clientData.phone])
        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error('Erreur lors de la création du client:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const updateClientByID = async (req, res) => {
    try {

        const { id } = req.params
        const clientData = req.body

        const existingClient = await pool.query('SELECT * FROM clients WHERE id = $1', [id])
        if(existingClient.rows.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé' })
        }

        const result = await pool.query('UPDATE clients SET name = $1, firstname = $2, phone = $3 WHERE id = $4 RETURNING *'
            , [clientData.name, clientData.firstname, clientData.phone, id])
        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

export const deleteClientByID = async (req, res) => {
    try {
        const { id } = req.params

        const existingClient = await pool.query('SELECT * FROM clients WHERE id = $1', [id])
        if(existingClient.rows.length === 0) {
            return res.status(404).json({ message: 'Client non trouvé' })
        }

        await pool.query('DELETE FROM clients WHERE id = $1', [id])
        res.status(200).json({ message: 'Client supprimé avec succès' })

    } catch (error) {
        console.error('Erreur lors de la suppression du client:', error)
        res.status(500).json({ message: 'Erreur serveur' })
    }
}