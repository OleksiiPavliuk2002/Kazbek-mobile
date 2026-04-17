import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ScrollView, ActivityIndicator, StyleSheet,
} from 'react-native';
import { COLORS, MENU_FALLBACK } from '../constants';
import { fetchMenu } from '../hooks/useApi';

const TYPE_ICONS = { 'Гаряче': '🔥', 'Суп': '🍲', 'Закуска': '🥗', 'Хліб': '🫓', 'Десерт': '🍬' };

export default function MenuScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('Всі');

  useEffect(() => {
    fetchMenu()
      .then(d => setItems(d?.length ? d : MENU_FALLBACK))
      .catch(() => setItems(MENU_FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const types = ['Всі', ...Array.from(new Set(items.map(i => i.type)))];
  const visible = active === 'Всі' ? items : items.filter(i => i.type === active);

  return (
    <View style={s.screen}>

      <View style={s.header}>
        <Text style={s.headerLabel}>НАШЕ МЕНЮ</Text>
        <Text style={s.headerTitle}>Страви кавказької кухні</Text>
        <View style={s.divider} />
      </View>

      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={s.filterBar} contentContainerStyle={s.filterContent}
      >
        {types.map(t => (
          <TouchableOpacity
            key={t}
            style={[s.chip, active === t && s.chipActive]}
            onPress={() => setActive(t)}
          >
            {t !== 'Все' ? (
              <Text style={s.chipIcon}>{TYPE_ICONS[t] ?? '🍽'}</Text>
            ) : (
              <View style={s.chipIconPlaceholder} />
            )}
            <Text style={[s.chipText, active === t && s.chipTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={s.loader}>
          <ActivityIndicator color={COLORS.gold} size="large" />
          <Text style={s.loaderText}>Завантажуємо меню…</Text>
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 28 }}
          ListHeaderComponent={
            <View style={s.thead}>
              <Text style={s.th}>Блюдо</Text>
              <Text style={[s.th, s.thRight]}>Ціна</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={[s.row, index % 2 !== 0 && s.rowAlt]}>
              <Text style={s.rowEmoji}>{item.emoji ?? '🍽'}</Text>
              <View style={s.rowMid}>
                <Text style={s.rowName}>{item.name}</Text>
                <Text style={s.rowMeta}>{item.type} · {item.portion}</Text>
              </View>
              <Text style={s.rowPrice}>{item.price} ₴</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  header: { backgroundColor: COLORS.bg2, paddingHorizontal: 22, paddingTop: 22, paddingBottom: 18 },
  headerLabel: { color: COLORS.gold, fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 6 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: COLORS.cream },
  divider: { width: 46, height: 2, backgroundColor: COLORS.gold, marginTop: 10 },

  filterBar: { backgroundColor: COLORS.bg2, maxHeight: 54 },
  filterContent: { paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 2, height: 40, width: 90,
  },
  chipActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  chipIcon: { fontSize: 12, textAlign: 'center' },
  chipText: { color: COLORS.muted, fontSize: 11, fontWeight: '600', letterSpacing: 0.8, textAlign: 'center' },
  chipTextActive: { color: COLORS.bg },

  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  loaderText: { color: COLORS.muted, fontStyle: 'italic', fontSize: 14 },

  thead: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.gold,
    marginHorizontal: 14, marginTop: 14,
  },
  th: { color: COLORS.gold, fontSize: 9, letterSpacing: 2, fontWeight: '700', textTransform: 'uppercase', flex: 1 },
  thRight: { textAlign: 'right', flex: 0, minWidth: 60 },

  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  rowAlt: { backgroundColor: 'rgba(201,147,58,0.03)' },
  rowEmoji: { fontSize: 20, width: 34 },
  rowMid: { flex: 1, marginHorizontal: 10 },
  rowName: { color: COLORS.cream, fontSize: 14, fontWeight: '500', marginBottom: 2 },
  rowMeta: { color: COLORS.muted, fontSize: 11, fontStyle: 'italic' },
  rowPrice: { color: COLORS.goldLt, fontSize: 15, fontWeight: '700', minWidth: 60, textAlign: 'right' },
});
