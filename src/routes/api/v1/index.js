import { Router } from 'express'
import userRouter from './user.route.js'

const router = Router()

router.get('/', (_, res) => res.send('API v1 running !!'))
router.use('/users', userRouter)

export default router
