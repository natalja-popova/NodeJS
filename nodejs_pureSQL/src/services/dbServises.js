import { pool } from "../config/db.js";

export const isUserExists = async (userEmail, userId) => {
  const existing = await pool.query(
    "SELECT * FROM users WHERE email = $1 or id=$2",
    [userEmail, userId],
  );
  return existing.rows.length > 0;
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email],
  );
  return result.rows[0] || null;
};

export const queryGetAllUsers = () => pool.query("SELECT * FROM users");

export const queryGetUserById = (userId) => {
  return pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [userId]);
};

export const queryGetUserByIdWithTickets = (userId) => {
  const data = pool.query(
    `SELECT 
        u.id,
        u.name,
        u.email,
        u.money_balance,
        json_agg(
          json_build_object( 
            'id', t.id,
            'title', t.title,
            'ticket_price', t.ticket_price,
            'from_location', t.from_location,
            'to_location', t.to_location,
            'to_location_photo_url', t.to_location_photo_url
          )
        ) AS tickets
      FROM users u
      LEFT JOIN tickets t ON u.id = t.userid
      WHERE u.id = $1
      GROUP BY u.id;
      `,
    [userId],
  );
  return data;
};

export const queryUpdateUser = (updatedBalance, userId) => {
  return pool.query(
    "update users set money_balance=$1 where id=$2 RETURNING *",
    [updatedBalance, userId],
  );
};

//transactions
export const queryLockUserForUpdate = (client, userId) => {
  return client.query("SELECT * FROM users WHERE id = $1 LIMIT 1  FOR UPDATE", [
    userId,
  ]);
};

export const queryUpdateUserBalance = (client, ticket_price, userId) => {
  return client.query(
    "UPDATE users set money_balance=money_balance-$1 where id=$2 RETURNING  *",
    [ticket_price, userId],
  );
};

export const queryInsertTicket = (
  client,
  {
    id,
    title,
    ticket_price,
    from_location,
    to_location,
    to_location_photo_url,
    userId,
  },
) => {
  return client.query(
    `INSERT INTO tickets 
      (id, title, ticket_price, from_location, to_location, to_location_photo_url, userid)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      id,
      title,
      ticket_price,
      from_location,
      to_location,
      to_location_photo_url,
      userId,
    ],
  );
};

export const queryGetAllUsersWithTickets = () => {
  return pool.query(`SELECT u.id, u.name, u.email, u.money_balance,
            json_agg(
                json_build_object(
                    'id', t.id,'title', t.title,'ticket_price', t.ticket_price,'from_location', t.from_location,'to_location', t.to_location,'to_location_photo_url', t.to_location_photo_url
                    )
               ) AS tickets
               FROM users u 
               INNER JOIN tickets t ON u.id = t.userid      
               GROUP BY u.id`);
};
