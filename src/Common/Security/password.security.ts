import * as bcrypt from 'bcrypt'

export const hash =(password : string):string => bcrypt.hashSync(password , Number(process.env.SALT_ROUNDS))

export const compare =(password : string , hash : string):boolean => bcrypt.compareSync(password , hash)
