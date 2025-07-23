import { SideMenu } from '@/components/organisms';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer 
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'transparent',
        },
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#1d2129',
          },
          headerTintColor: '#fff', // For text and icons
          headerShadowVisible: false, // This removes the line under the header
        }} />

      <Drawer.Screen 
        name='chat/[sessionId]'
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#1d2129'
          },
          headerTintColor: '#fff',
          headerShadowVisible: false
        }} />
    </Drawer>
  );
}
