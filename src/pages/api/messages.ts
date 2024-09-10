// pages/api/messages/index.js
import pool from '../../../db';  // Убедитесь, что путь к файлу конфигурации базы данных верный

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM messages ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Ошибка базы данных:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Метод не поддерживается');
  }
}
