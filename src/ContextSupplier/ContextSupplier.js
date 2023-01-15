import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../FireBase/FireBase.config';
import { Box, Container } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';

export const UniversalContext = createContext();
const auth = getAuth(app)


const ContextSupplier = ({ children }) => {
    /* Dark Mode Setup */
    const [mode, setMode] = useState("light");
    
    /* firebase User */
    const [user, setUser] = useState(null);
    
    /* Firebase Loading */
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    
    /* Spinner  */
    if (loading) {
        return (
            <Container sx={{height: '100vh', display: 'grid', placeItems: 'center'}}>
                <Box>
                    <RotatingLines
                        strokeColor="lime"
                        strokeWidth="3"
                        animationDuration="0.25"
                        width="400"
                        visible={true}
                        />
                </Box>
            </Container>
        )
    }

    const createUserByEmailAndPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updatePhotoAndName = photoAndName => {
        return updateProfile(auth.currentUser, photoAndName);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const logInWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };



    const contextInformation = {
        setMode,
        mode,
        user,
        createUserByEmailAndPassword,
        updatePhotoAndName,
        logOut,
        logInWithEmailAndPassword,
        signInWithGoogle, 
    }


    return (
        <div>
            <UniversalContext.Provider value={contextInformation}>
                {children}
            </UniversalContext.Provider>
        </div>
    );
};

export default ContextSupplier;