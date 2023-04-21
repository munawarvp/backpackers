import * as Yup from 'yup'

export const UpdateResortSchema = Yup.object({
    resort_name: Yup.string().min(4).required('Resort name is required'),
    place: Yup.string().min(4).required('Place is required'),
    location: Yup.number().required('Location is required'),
    address: Yup.string().min(4).required('Address is required'),
    zipcode: Yup.string().min(4).required('Zipcode is required'),
    phone_number: Yup.string().min(4).required('Phone is required'),
    rooms_available: Yup.number().min(4).required('Number of room is required'),
    price: Yup.number().min(4).required('Prie is required'),
    room_type: Yup.string().min(4).required('Room type is required'),
    description: Yup.string().min(4).required('Description is required'),

})

export const AddActivitySchema = Yup.object({
    activity_name: Yup.string().min(4).required("Activity name is required..!"),
    activity_type: Yup.string().min(4).required("Activity Type is required..!"),
    place: Yup.string().required("Place is required..!"),
    time_take: Yup.number().required("This field is required..!"),
    about: Yup.string().required("About is required..!"),
    day_slot: Yup.number().required("This field is required..!"),
    safety: Yup.string().required("Safety field is required..!"),
})

export const AddDestinationSchema = Yup.object({
    spot_name: Yup.string().min(4).required("This field is required..!"),
    place: Yup.string().min(4).required("This field is required..!"),
    about: Yup.string().min(4).required("This field is required..!"),
})

export const RegisterWithSchema = Yup.object({
    resort_name: Yup.string().min(4).required('This field is required'),
    place: Yup.string().min(4).required('This field is required'),
    price: Yup.number().min(4).required('This field is required'),
    address: Yup.string().min(4).required('This field is required'),
    zipcode: Yup.string().min(4).required('This field is required'),
    phone_number: Yup.string().min(4).required('This field is required'),
    rooms_available: Yup.number().min(4).required('This field is required'),
    
    description: Yup.string().min(4).required('This field is required'),
})