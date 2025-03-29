// import React, { useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Text, Button, TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import axios from 'axios';
// import { router } from 'expo-router';
// import { checkPassword, changeUserPassword } from '@/functions/authFunctions';

// const darkTheme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#6200ee',
//         background: '#121212',
//         surface: '#121212',
//         text: '#ffffff',
//     },
// };

// const changePassword = () => {
//     const [oldPassword, setOldPassword] = useState('')
//     const [newPassword, setNewPassword] = useState('');
//     const [duplicatePassword, setDuplicatePassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [signedup, setSignedUp] = useState(false);

//     const handleSignup = async () => {
//         if (!oldPassword || !newPassword || !duplicatePassword) {
//             setError('Please enter all the values.');
//             return;
//         }
//         if (newPassword !== duplicatePassword){
//             setError('Passwords dont match.')
//             return;
//         }
//         setError('');
//         setLoading(true);
        
//         try {
//             const chk = checkPassword(oldPassword);
//             if (!chk){
//                 setError('Old password is wrong')
//                 setLoading(false)
//                 return
//             }
//             const chk2 = changeUserPassword(newPassword);
//         } catch (err: any) {
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <PaperProvider theme={darkTheme}>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Change Password</Text>
//                 <TextInput
//                     label="Old password"
//                     value={e}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     style={styles.input}
//                     textColor='#ffffff'
//                 />
//                 <TextInput
//                     label="Username"
//                     value={username}
//                     onChangeText={setUsername}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     style={styles.input}
//                     textColor='#ffffff'
//                 />
//                 <TextInput
//                     label="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry
//                     style={styles.input}
//                     textColor='#ffffff'
//                 />
//                 <TextInput
//                     label="Re-enter Password"
//                     value={duplicatePassword}
//                     onChangeText={setDuplicatePassword}
//                     secureTextEntry
//                     style={styles.input}
//                     textColor='#ffffff'
//                 />
//                 {error ? <Text style={styles.errorText}>{error}</Text> : null}
//                 <Button mode="contained" onPress={handleSignup} loading={loading} disabled={loading} style={styles.button}>
//                     Signup
//                 </Button>
//                 {signedup && <Text style={styles.helper}>Signup successful. Leading to Login</Text>}
//             </View>
//         </PaperProvider>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//         backgroundColor: '#121212',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     helper: {
//         marginTop: 20,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         marginBottom: 16,
//         backgroundColor: '#1E1E1E',
//     },
//     button: {
//         marginTop: 16,
//     },
//     errorText: {
//         color: 'red',
//         textAlign: 'center',
//         marginBottom: 10,
//     },
// });

// export default Login;
