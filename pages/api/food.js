import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session";
import db from '../../db';

// this handler runs for /api/food with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {

    
     if (!req.session.user) {

      return res.status(401).json({ error: "User Not Found" })
    }

      // User info can be accessed with req.session
    // No user info on the session means the user is not logged in

    switch (req.method) {
      // TODO: On a POST request, add a food using db.food.add with request body (must use JSON.parse)
      case 'POST':
        try {
          const addFood = JSON.parse(req.body)
          console.log(addFood)
            console.log(req.session.user.id)
          const addedFood = await db.food.add(1, addFood)
          
          
         
          if (addedFood === null) {
            req.session.destroy()
            return res.status(401).json({error: "User not found"})
          }

          return res.status(200).json(addFood)
        }

        catch (error) {
          console.log(error)
          return res.status(400).json({ error: error.message })
        }

      case 'DELETE':
        // TODO: On a DELETE request, remove a food using db.food.remove with request body (must use JSON.parse)

        try {
          const removeFood = JSON.parse(req.body)
          const removedFood = await db.food.remove(req.session.user.id, removeFood.id)

          if (removedFood === null) {
            req.session.destroy()
            return res.status(401).json({ error: "User Not Found" })
          }

          return res.status(200).json(removeFood)
        }
        catch (error) {

          return res.status(400).json({ error: error.message })
        }




      // TODO: Respond with 404 for all other requests
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)