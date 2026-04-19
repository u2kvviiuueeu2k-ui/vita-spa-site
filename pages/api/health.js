import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const status = client ? 'connected' : 'no_db_configured'
    res.status(200).json({ status: 'ok', db: status })
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message })
  }
}
