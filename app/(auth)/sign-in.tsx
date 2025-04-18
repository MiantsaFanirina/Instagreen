import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {styles} from "@/styles/auth.styles";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/constants/theme";
import {useSSO} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

export default function Page() {

    const {startSSOFlow} = useSSO()
    const router = useRouter()



    const handleGoogleSignIn = async () => {
        try {
            const {createdSessionId, setActive} = await startSSOFlow({strategy: "oauth_google"})
            if(setActive && createdSessionId) {
                await setActive!({session: createdSessionId})
                router.push('/(tabs)')
            }
        } catch (e) {
            console.error("OAuth error", e)
        }
    }

    return (
        <View style={styles.container}>
            {/*BRAND SECTION*/}
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name={'logo-instagram'} size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>Instagreen</Text>
                <Text style={styles.tagline}>Don't miss anything</Text>
            </View>

            {/*ILLUSTRATION*/}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require('../../assets/images/auth-bg-2.png')}
                    style={styles.illustration}
                    resizeMode={"cover"}
                />
            </View>

            {/*LOGIN SECTION*/}
            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.9}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name={'logo-google'} size={20} color={COLORS.surface} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
            </View>
        </View>
    )
}