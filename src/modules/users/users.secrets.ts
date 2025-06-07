export interface UserSecret {
  _id?: string
  userId: string
  password: string
  otp?: string
  otpExpiry?: Date
  createdAt: Date
  updatedAt: Date
}
