import {
  View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, IMAGES, CUISINE_CARDS } from '../constants';

const { width } = Dimensions.get('window');

export default function CuisineScreen() {
  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>

      <ImageBackground source={IMAGES.cuisine} style={s.banner}>
        <LinearGradient
          colors={['rgba(13,10,7,0.50)', 'rgba(13,10,7,0.96)']}
          style={s.bannerGrad}
        >
          <Text style={s.bannerLabel}>КУЛЬТУРА</Text>
          <Text style={s.bannerTitle}>Кавказька{'\n'}кухня</Text>
          <View style={s.divider} />
          <Text style={s.bannerBody}>
            Тисячолітня історія народів, об'єднаних любов'ю до життя,
            гостинності та смачної їжі. Кожна страва – це розповідь.
          </Text>
        </LinearGradient>
      </ImageBackground>

      <View style={s.cardsWrap}>
        {CUISINE_CARDS.map(c => (
          <View style={s.card} key={c.title}>
            <Text style={s.cardIcon}>{c.icon}</Text>
            <Text style={s.cardTitle}>{c.title}</Text>
            <Text style={s.cardBody}>{c.text}</Text>
          </View>
        ))}
      </View>

      <View style={s.quoteWrap}>
        <LinearGradient colors={[COLORS.bg3, COLORS.bg2]} style={s.quoteBox}>
          <Text style={s.quoteEmoji}>🏔</Text>
          <Text style={s.quoteText}>
            «Гість у будинок - радість у будинок. {'\n'}
            Там, де гарний стіл - там гарне життя»
          </Text>
          <Text style={s.quoteAuthor}>— Кавказька мудрість</Text>
        </LinearGradient>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  banner: { height: 360 },
  bannerGrad: { flex: 1, justifyContent: 'flex-end', padding: 26, paddingBottom: 34 },
  bannerLabel: { color: COLORS.gold, fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 10 },
  bannerTitle: { fontSize: 36, fontWeight: '900', color: COLORS.cream, lineHeight: 42, marginBottom: 12 },
  divider: { width: 46, height: 2, backgroundColor: COLORS.gold, marginBottom: 14 },
  bannerBody: { color: COLORS.muted, fontSize: 14, lineHeight: 22 },

  cardsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 18 },
  card: {
    width: (width - 48) / 2,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: COLORS.border,
    padding: 16,
  },
  cardIcon: { fontSize: 24, marginBottom: 10 },
  cardTitle: { color: COLORS.goldLt, fontSize: 13, fontWeight: '700', marginBottom: 7 },
  cardBody: { color: COLORS.muted, fontSize: 12, lineHeight: 18 },

  quoteWrap: { paddingHorizontal: 18, paddingBottom: 8 },
  quoteBox: { padding: 28, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  quoteEmoji: { fontSize: 30, marginBottom: 14 },
  quoteText: { color: COLORS.cream, fontSize: 15, fontStyle: 'italic', textAlign: 'center', lineHeight: 26, marginBottom: 10 },
  quoteAuthor: { color: COLORS.gold, fontSize: 12, letterSpacing: 0.8 },
});
