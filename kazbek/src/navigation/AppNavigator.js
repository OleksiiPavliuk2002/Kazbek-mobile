import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CuisineScreen from '../screens/CuisineScreen';
import BookingScreen from '../screens/BookingScreen';
import ContactsScreen from '../screens/ContactsScreen';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', label: 'Головна', icon: 'home', component: HomeScreen },
  { name: 'Menu', label: 'Меню', icon: 'restaurant', component: MenuScreen },
  { name: 'Cuisine', label: 'Кухня', icon: 'leaf', component: CuisineScreen },
  { name: 'Booking', label: 'Бронь', icon: 'calendar', component: BookingScreen },
  { name: 'Contacts', label: 'Контакти', icon: 'location', component: ContactsScreen },
];

export default function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.bg2,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
          elevation: 0,
        },
        headerTitle: () => (
          <Text style={s.headerTitle}>🌿 Кафе "Казбек"</Text>
        ),

        tabBarStyle: {
          backgroundColor: COLORS.bg2,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 62 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 4,
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: { fontSize: 9, letterSpacing: 0.4, fontWeight: '600' },

        tabBarIcon: ({ focused, color, size }) => {
          const tab = TABS.find(t => t.name === route.name);
          return (
            <Ionicons
              name={focused ? tab.icon : `${tab.icon}-outline`}
              size={22}
              color={color}
            />
          );
        },
        tabBarLabel: TABS.find(t => t.name === route.name)?.label ?? route.name,
      })}
    >
      {TABS.map(t => (
        <Tab.Screen key={t.name} name={t.name} component={t.component} />
      ))}
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  headerTitle: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});