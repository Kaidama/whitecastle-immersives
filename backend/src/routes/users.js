
import { Router } from 'express'
import { userData } from '../controllers/userController'
const router = Router()


router.get('/', userData )


export default router
