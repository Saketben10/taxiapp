import { View, Text } from 'react-native'
import React from 'react'

import { Ride } from '@/types/type'

const Ridecard = ({ ride:{
        driver,destination_latitude,created_at,driver_id,ride_time,payment_status
} }: { ride: Ride }) => {
  return (
    <View className='flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 '>

        <View className='flex flex-row justify-between items-center'>

        </View>
      <Text>{driver.first_name}</Text>
    </View>
  )
}

export default Ridecard