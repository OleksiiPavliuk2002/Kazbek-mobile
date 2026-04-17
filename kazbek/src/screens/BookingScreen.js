import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, TIMES, GUEST_OPTIONS } from '../constants';
import { createBooking } from '../hooks/useApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';

const guestLabel = n =>
  n === 1 ? '1 гість' : n < 5 ? `${n} гостя` : `${n} гостей`;

export default function BookingScreen() {
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  useEffect(() => {
    if (status === 'ok') {
      const timer = setTimeout(() => {
        setStatus(null);
        setMsg('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      time: '12:00',
      guests: 2,
      comment: '',
    },
    mode: 'onChange',
  });


  const submit = async data => {
    const parsed = parseDate(data.date);
    if (!parsed || isNaN(parsed.getTime())) {
      Alert.alert('Увага', 'Будь ласка, виберіть правильну дату.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = new Date(parsed);
    sel.setHours(0, 0, 0, 0);
    if (sel < today) {
      Alert.alert('Увага', 'Дата не може бути в минулому.');
      return;
    }

    setBusy(true);
    setStatus(null);
    try {
      await createBooking({ ...data, guests: Number(data.guests) });
      setStatus('ok');
      setMsg('✅ Стол заброньований! Ми зв\'яжемося з вами для підтвердження.');
      Object.keys(data).forEach(key => {
        if (key === 'time') setValue(key, '12:00');
        else if (key === 'guests') setValue(key, 2);
        else setValue(key, '');
      });
    } catch (err) {
      setStatus('err');
      setMsg(`❌ ${err.message || 'Помилка. Зв\'яжіться з нами безпосередньо.'}`);
    } finally {
      setBusy(false);
    }
  };

  function formatDate(d) {
    if (!d) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  function parseDate(s) {
    if (!s) return null;
    const parts = String(s).split('.');
    if (parts.length !== 3) return null;
    const dd = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10) - 1;
    const yyyy = parseInt(parts[2], 10);
    const d = new Date(yyyy, mm, dd);
    if (d.getFullYear() !== yyyy || d.getMonth() !== mm || d.getDate() !== dd) return null;
    return d;
  }

  function isBeforeToday(d) {
    if (!d) return false;
    const a = new Date(d);
    a.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    return a < today;
  }

  return (
    <ScrollView
      style={s.screen}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.hdr}>
        <Text style={s.hdrLabel}>РЕЗЕРВАЦІЯ</Text>
        <Text style={s.hdrTitle}>Забронювати стіл</Text>
        <View style={s.divider} />
        <Text style={s.hdrBody}>
          Зарезервуйте стіл онлайн — ми підготовимо все до вашого приходу.
          Для великих компаній телефонуйте безпосередньо.
        </Text>
        <Text style={s.hdrQuote}>«Гість в дім — радість в дім»</Text>
      </View>
      <View style={s.form}>

        <Field label="ІМ'Я *">
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Вкажіть ім\'я', pattern: { value: /^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/, message: 'Ім\'я має містити не менше 2 символів' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={s.input}
                value={value}
                onChangeText={onChange}
                placeholder="Іван Іванов"
                placeholderTextColor={COLORS.muted}
              />
            )}
          />
          {errors.name && <Text style={{ color: '#f44336', marginTop: 8 }}>{errors.name.message}</Text>}
        </Field>

        <Field label="ТЕЛЕФОН *">
          <Controller
            control={control}
            name="phone"
            rules={{ required: 'Вкажіть телефон', pattern: { value: /^\+?[\d\s\-()]{12,}$/, message: 'Введить правильний номер телефону' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={s.input}
                value={value}
                onChangeText={onChange}
                placeholder="+380XXXXXXXXX"
                placeholderTextColor={COLORS.muted}
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && <Text style={{ color: '#f44336', marginTop: 6 }}>{errors.phone.message}</Text>}
        </Field>

        <Field label="ДАТА * (ДД.ММ.ГГГГ)">
          <Controller
            control={control}
            name="date"
            rules={{ required: 'Вкажіть дату', validate: (v) => {
              const d = parseDate(v);
              if (!d) return 'Введіть правильну дату';
              if (isBeforeToday(d)) return 'Дата не може бути в минулому. Виберіть іншу дату.';
              return true;
            } }}
            render={({ field: { value, onChange } }) => (
              <>
                <TouchableOpacity
                  style={[s.pickerBox, { padding: 12, justifyContent: 'center' }]}
                  onPress={() => {
                    setShowDatePicker(true);
                    const pd = parseDate(value);
                    setDateObj(pd || new Date());
                  }}
                >
                  <Text style={{ color: value ? COLORS.cream : COLORS.muted }}>{value || 'Вибрати дату'}</Text>
                </TouchableOpacity>

                {errors.date && (
                  <Text style={{ color: '#f44336', marginTop: 6 }}>
                    {errors.date.message}
                  </Text>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    value={dateObj || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (event?.type === 'dismissed' || !selectedDate) return;
                      const d = selectedDate || dateObj || new Date();
                      const formatted = formatDate(d);
                      onChange(formatted);
                      setDateObj(d);
                    }}
                  />
                )}
              </>
            )}
          />
        </Field>

        <Field label="ЧАС">
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value } }) => (
              <View style={s.pickerBox}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={s.picker}
                  dropdownIconColor={COLORS.gold}
                >
                  {TIMES.map(t => (
                    <Picker.Item key={t} label={t} value={t} color={COLORS.cream} />
                  ))}
                </Picker>
              </View>
            )}
          />
        </Field>

        <Field label="ГОСТІ">
          <Controller
            control={control}
            name="guests"
            render={({ field: { onChange, value } }) => (
              <View style={s.pickerBox}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={s.picker}
                  dropdownIconColor={COLORS.gold}
                >
                  {GUEST_OPTIONS.map(n => (
                    <Picker.Item key={n} label={guestLabel(n)} value={n} color={COLORS.cream} />
                  ))}
                </Picker>
              </View>
            )}
          />
        </Field>

        <Field label="КОМЕНТАРІ (НЕ ОБОВ'ЯЗКОВО)">
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[s.input, s.textarea]}
                value={value}
                onChangeText={onChange}
                placeholder="Побажання, привід, алергії…"
                placeholderTextColor={COLORS.muted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
        </Field>

        {status === 'ok'  && <View style={s.okBox}><Text  style={s.okText}>{msg}</Text></View>}
        {status === 'err' && <View style={s.errBox}><Text style={s.errText}>{msg}</Text></View>}

        <TouchableOpacity style={s.submitBtn} onPress={handleSubmit(submit)} disabled={busy}>
          {busy
            ? <ActivityIndicator color={COLORS.bg} />
            : <Text style={s.submitText}>ЗАБРОНЮВАТИ СТІЛ</Text>
          }
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function Field({ label, children }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={fs.label}>{label}</Text>
      {children}
    </View>
  );
}
const fs = StyleSheet.create({ label: { color: COLORS.gold, fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 6 } });

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  hdr:      { backgroundColor: COLORS.bg2, padding: 24, paddingBottom: 28 },
  hdrLabel: { color: COLORS.gold, fontSize: 10, letterSpacing: 3, fontWeight: '700', marginBottom: 8 },
  hdrTitle: { fontSize: 24, fontWeight: '700', color: COLORS.cream },
  divider:  { width: 46, height: 2, backgroundColor: COLORS.gold, marginVertical: 14 },
  hdrBody:  { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginBottom: 10 },
  hdrQuote: { color: COLORS.gold, fontStyle: 'italic', fontSize: 14 },

  form: { padding: 22 },

  input: {
    borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: COLORS.cream, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14,
  },
  textarea: { height: 88 },

  pickerBox: {
    borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  picker: { color: COLORS.cream, height: 52 },

  okBox:  { backgroundColor: 'rgba(76,175,80,0.12)',  borderWidth:1, borderColor:'#4caf50', padding:14, marginBottom:12 },
  okText: { color:'#81c784', fontSize:13, lineHeight:20 },
  errBox: { backgroundColor: 'rgba(244,67,54,0.12)', borderWidth:1, borderColor:'#f44336', padding:14, marginBottom:12 },
  errText:{ color:'#ef9a9a', fontSize:13, lineHeight:20 },

  submitBtn:  { backgroundColor: COLORS.gold, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  submitText: { color: COLORS.bg, fontSize: 12, fontWeight: '900', letterSpacing: 2.5 },
});
