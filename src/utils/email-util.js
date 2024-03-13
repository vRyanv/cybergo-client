export default function IsValidEmail(email){
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}