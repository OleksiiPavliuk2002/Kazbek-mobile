import {
  View, Text, ScrollView, Image,
  TouchableOpacity, StyleSheet, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, IMAGES, CAFE_INFO } from '../constants';

export default function ContactsScreen() {
  const call = phone => Linking.openURL(`tel:${phone}`);
  const mail = () => Linking.openURL(`mailto:${CAFE_INFO.email}`);
  const maps = () => Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${CAFE_INFO.mapLat},${CAFE_INFO.mapLon}`
  );

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      <Image source={IMAGES.footer} style={s.banner} />

      <View style={s.hdr}>
        <Text style={s.hdrLabel}>ЗНАЙТИ НАС</Text>
        <Text style={s.hdrTitle}>Контакти</Text>
        <View style={s.divider} />
      </View>

      <View style={s.body}>

        <Block icon="location" title="АДРЕСА">
          <Text style={s.val}>{CAFE_INFO.address}</Text>
          <TouchableOpacity style={s.outlineBtn} onPress={maps}>
            <Ionicons name="map-outline" size={14} color={COLORS.gold} />
            <Text style={s.outlineBtnText}>ВІДКРИТИ У GOOGLE MAPS</Text>
          </TouchableOpacity>
        </Block>

        <Block icon="call-sharp" title="ТЕЛЕФОНИ">
          <TouchableOpacity onPress={() => call(CAFE_INFO.phone1)} style={s.phoneRow}>
            <Ionicons name="call-outline" size={16} color={COLORS.gold} />
            <Text style={[s.val, s.link]}>{CAFE_INFO.phone1Label}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => call(CAFE_INFO.phone2)} style={s.phoneRow}>
            <Ionicons name="call-outline" size={16} color={COLORS.gold} />
            <Text style={[s.val, s.link]}>{CAFE_INFO.phone2Label}</Text>
          </TouchableOpacity>
        </Block>

        <Block icon="mail-sharp" title="EMAIL">
          <TouchableOpacity onPress={mail}>
            <Text style={[s.val, s.link]}>{CAFE_INFO.email}</Text>
          </TouchableOpacity>
        </Block>

        <Block icon="time-sharp" title="РЕЖИМ РОБОТИ">
          {CAFE_INFO.hours.map(h => (
            <View key={h.day} style={s.hoursRow}>
              <Text style={s.hoursDay}>{h.day}</Text>
              <Text style={s.hoursTime}>{h.time}</Text>
            </View>
          ))}
        </Block>

      </View>

      <View style={s.ctaWrap}>
        <Text style={s.ctaHint}>Зателефонуйте нам зараз</Text>

        <TouchableOpacity onPress={() => call(CAFE_INFO.phone1)}>
          <LinearGradient colors={[COLORS.gold, '#a07020']} style={s.ctaBtn}>
            <Ionicons name="call" size={18} color={COLORS.bg} />
            <Text style={s.ctaBtnText}>{CAFE_INFO.phone1Label}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => call(CAFE_INFO.phone2)} style={{ marginTop: 10 }}>
          <View style={s.ctaBtnOutline}>
            <Ionicons name="call-outline" size={18} color={COLORS.gold} />
            <Text style={s.ctaBtnOutlineText}>{CAFE_INFO.phone2Label}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={[COLORS.gold, COLORS.red]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={s.delivery}
      >
        <Text style={s.deliveryEmoji}>🛵</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.deliveryTitle}>ДОСТАВКА ВІД 300 ₴</Text>
          <Text style={s.deliverySub}>Швидко та смачно</Text>
        </View>
      </LinearGradient>

      <View style={s.foot}>
        <Text style={s.footText}>
          Ми впевнені — наше кафе найкраще у місті! 🌿 
          {'\n'} {'\n'} Зроблено з ❤ та шашликом.
        </Text>
        <Text style={s.footCopy}>© {new Date().getFullYear()} Кафе "Казбек"</Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

function Block({ icon, title, children }) {
  return (
    <View style={bs.wrap}>
      <View style={bs.titleRow}>
        <Ionicons name={icon} size={14} color={COLORS.gold} />
        <Text style={bs.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
const bs = StyleSheet.create({
  wrap: { marginBottom: 24, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  title: { color: COLORS.gold, fontSize: 11, letterSpacing: 2, fontWeight: '700' },
});

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  banner: { width: '100%', height: 180, resizeMode: 'cover', opacity: 0.65 },

  hdr: { backgroundColor: COLORS.bg2, paddingHorizontal: 22, paddingTop: 22, paddingBottom: 18 },
  hdrLabel: { color: COLORS.gold, fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 6 },
  hdrTitle: { fontSize: 24, fontWeight: '700', color: COLORS.cream },
  divider: { width: 46, height: 2, backgroundColor: COLORS.gold, marginTop: 10 },

  body: { padding: 22 },

  val: { color: COLORS.cream, fontSize: 15, marginBottom: 4 },
  link: { color: COLORS.goldLt, textDecorationLine: 'underline' },

  outlineBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10,
    borderWidth: 1, borderColor: COLORS.gold,
    paddingHorizontal: 14, paddingVertical: 10, alignSelf: 'flex-start',
  },
  outlineBtnText: { color: COLORS.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },

  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },

  hoursRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 7, borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  hoursDay: { color: COLORS.muted, fontSize: 13 },
  hoursTime: { color: COLORS.cream, fontSize: 13, fontWeight: '600' },

  ctaWrap: { paddingHorizontal: 22, marginBottom: 20 },
  ctaHint: { color: COLORS.muted, fontSize: 13, fontStyle: 'italic', marginBottom: 14 },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  ctaBtnText: { color: COLORS.bg, fontSize: 14, fontWeight: '900', letterSpacing: 0.8 },
  ctaBtnOutline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: COLORS.gold, paddingVertical: 14 },
  ctaBtnOutlineText: { color: COLORS.gold, fontSize: 14, fontWeight: '700', letterSpacing: 0.8 },

  delivery: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 22, padding: 18 },
  deliveryEmoji: { fontSize: 28 },
  deliveryTitle: { color: COLORS.bg, fontSize: 13, fontWeight: '900', letterSpacing: 0.8 },
  deliverySub: { color: COLORS.bg, fontSize: 11, opacity: 0.8 },

  foot: { margin: 22, padding: 24, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  footText: { color: COLORS.muted, fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 10 },
  footCopy: { color: COLORS.gold, fontSize: 11, letterSpacing: 0.8 },
});
