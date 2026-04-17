import {
  View, Text, ScrollView, ImageBackground, Image,
  TouchableOpacity, StyleSheet, Dimensions, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, IMAGES, CAFE_INFO } from '../constants';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      <ImageBackground source={IMAGES.hero} style={s.hero}>
        <LinearGradient
          colors={['rgba(13,10,7,0.30)', 'rgba(13,10,7,0.93)']}
          style={s.heroGrad}
        >
          <View style={s.ring} pointerEvents="none" />

          <View style={s.heroInner}>
            <View style={s.tagRow}>
              <View style={s.tagLine} />
              <Text style={s.tagText}>РЕСТОРАН · КАФЕ · ТРАДИЦІЇ</Text>
              <View style={s.tagLine} />
            </View>

            <Text style={s.heroTitle}>Кафе{'\n'}<Text style={s.heroGold}>«Казбек»</Text></Text>
            <Text style={s.heroSub}>Справжній смак Кавказу в кожній страві</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <View style={s.outlineBtn}>
                <Text style={s.outlineBtnText}>ДИВИТИСЯ МЕНЮ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={s.section}>
        <Text style={s.label}>ПРО НАС</Text>
        <Text style={s.title}>Місце, де живе традиція</Text>
        <View style={s.divider} />

        <View style={s.aboutImgWrap}>
          <Image source={IMAGES.about} style={s.aboutImg} />
          <View style={s.badge}>
            <Text style={s.badgeNum}>15</Text>
            <Text style={s.badgeCaption}>ЛІТ{'\n'}ТРАДИЦІЙ</Text>
          </View>
        </View>

        <Text style={s.body}>
          Кафе "Казбек" - затишне місце, де кожен гість почувається дорогим.
          Ми готуємо за рецептами, які передаються з покоління до покоління.
        </Text>
        <Text style={s.body}>
          Наші кухарі – носії традицій грузинської, вірменської та азербайджанської кулінарії.
          Тільки свіжі продукти, живий вогонь та справжні спеції.
        </Text>

        <View style={s.feats}>
          {[
            { icon: '🔥', t: 'Живий вогонь', d: 'М\'ясо на мангалі по-справжньому' },
            { icon: '🌿', t: 'Свіжі спеції', d: 'Привозимо з Грузії та Вірменії' },
            { icon: '🏔', t: 'Гірський дух', d: 'Атмосфера Кавказьких гір' },
            { icon: '👨‍🍳', t: 'Дослідні кухарі', d: 'Більше 15 років досвіду' },
          ].map(f => (
            <View style={s.feat} key={f.t}>
              <Text style={s.featIcon}>{f.icon}</Text>
              <Text style={s.featTitle}>{f.t}</Text>
              <Text style={s.featDesc}>{f.d}</Text>
            </View>
          ))}
        </View>
      </View>

      <Image source={IMAGES.shashlik} style={s.shashlikImg} />
      <LinearGradient colors={['#8b2020', '#5a1212']} style={s.shashlikBox}>
        <Text style={[s.label, { color: '#ffb3b3' }]}>НАША ГОРДІСТЬ</Text>
        <Text style={[s.title, { color: '#fff', marginBottom: 10 }]}>Шашлик - серце Кавказу</Text>
        <Text style={[s.body, { color: 'rgba(255,255,255,0.82)' }]}>
          Маринуємо м'ясо не менше 12 годин у суміші гірських трав, цибулі та спецій.
          Готуємо на дровах – неповторний аромат та золотиста скоринка.
        </Text>
        <Text style={[s.body, { color: 'rgba(255,255,255,0.82)', marginTop: 6 }]}>
          Баранина, яловичина, курка - все з перевірених фермерських господарств.
          Ні грама заморозки.
        </Text>
        <TouchableOpacity style={{ marginTop: 20, alignSelf: 'flex-start' }}
          onPress={() => navigation.navigate('Booking')}>
          <View style={[s.outlineBtn, { borderColor: '#fff' }]}>
            <Text style={[s.outlineBtnText, { color: '#fff' }]}>ЗАБРОНУВАТИ СТІЛ</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={[COLORS.gold, COLORS.red]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={s.delivery}
      >
        <Text style={s.deliveryEmoji}>🛵</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.deliveryTitle}>ДОСТАВКА ВІД 300 ₴</Text>
          <Text style={s.deliverySub}>{CAFE_INFO.phone1Label}</Text>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${CAFE_INFO.phone1}`)}>
          <View style={s.deliveryBtn}>
            <Text style={s.deliveryBtnText}>Дзвонити</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  hero: { height: 500 },
  heroGrad: { flex: 1, justifyContent: 'flex-end', paddingBottom: 48 },
  ring: {
    position: 'absolute', alignSelf: 'center', top: '28%',
    width: 270, height: 270, borderRadius: 135,
    borderWidth: 1, borderColor: 'rgba(201,147,58,0.22)',
  },
  heroInner: { paddingHorizontal: 28, alignItems: 'center' },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  tagLine: { flex: 1, maxWidth: 36, height: 1, backgroundColor: COLORS.gold },
  tagText: { color: COLORS.gold, fontSize: 9, letterSpacing: 2.8, fontWeight: '700', marginHorizontal: 10 },
  heroTitle: { fontSize: 50, fontWeight: '900', color: COLORS.cream, textAlign: 'center', lineHeight: 54, marginBottom: 10 },
  heroGold: { color: COLORS.gold },
  heroSub: { color: COLORS.muted, fontSize: 14, fontStyle: 'italic', marginBottom: 28, textAlign: 'center' },
  outlineBtn: { borderWidth: 1, borderColor: COLORS.gold, paddingHorizontal: 28, paddingVertical: 13 },
  outlineBtnText: { color: COLORS.gold, fontSize: 11, letterSpacing: 2.5, fontWeight: '700' },

  section: { backgroundColor: COLORS.bg2, paddingHorizontal: 24, paddingVertical: 36 },
  label: { color: COLORS.gold, fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.cream, lineHeight: 32 },
  divider: { width: 48, height: 2, backgroundColor: COLORS.gold, marginVertical: 14 },
  body: { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginBottom: 8 },

  aboutImgWrap: { position: 'relative', marginBottom: 20 },
  aboutImg: { width: '100%', height: 230, borderRadius: 2 },
  badge: {
    position: 'absolute', bottom: -18, right: 8,
    width: 82, height: 82, borderRadius: 41,
    backgroundColor: COLORS.gold,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.gold, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45, shadowRadius: 10, elevation: 8,
  },
  badgeNum: { color: COLORS.bg, fontSize: 24, fontWeight: '900', lineHeight: 26 },
  badgeCaption: { color: COLORS.bg, fontSize: 7, fontWeight: '700', letterSpacing: 0.5, textAlign: 'center' },

  feats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
  feat: {
    width: (width - 58) / 2,
    padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: 'rgba(201,147,58,0.04)',
  },
  featIcon: { fontSize: 22, marginBottom: 6 },
  featTitle: { color: COLORS.gold, fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 3 },
  featDesc: { color: COLORS.muted, fontSize: 12 },

  shashlikImg: { width: '100%', height: 220, resizeMode: 'cover' },
  shashlikBox: { padding: 26 },

  delivery: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 20, marginTop: 22,
    padding: 18, borderRadius: 2,
  },
  deliveryEmoji: { fontSize: 28 },
  deliveryTitle: { color: COLORS.bg, fontSize: 13, fontWeight: '900', letterSpacing: 0.8 },
  deliverySub: { color: COLORS.bg, fontSize: 11, opacity: 0.8 },
  deliveryBtn: { borderWidth: 1, borderColor: COLORS.bg, paddingHorizontal: 14, paddingVertical: 8 },
  deliveryBtnText: { color: COLORS.bg, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
});
