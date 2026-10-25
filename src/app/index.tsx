import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard';

// Dataset statis mahasiswa
const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const [keyword, setKeyword] = useState('');

// Logika pencarian canggih: mendeteksi huruf awal di tiap kata (depan maupun belakang)
  const filteredMahasiswa = DAFTAR_MAHASISWA.filter((item) => {
    const searchKey = keyword.toLowerCase().trim();
    if (!searchKey) return true; // Jika kotak pencarian kosong, tampilkan semua

    // Pecah nama berdasarkan spasi menjadi array kata (misal: ["alifia", "putri"])
    const words = item.nama.toLowerCase().split(' ');
    // Cek apakah ada kata (baik depan maupun belakang) yang DIAWALI dengan huruf/kata kunci pencarian
    return words.some((word) => word.startsWith(searchKey));
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Banner yang Lebih Elegan */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerSubtitle}>Ujian Tengah Semester</Text>
        <Text style={styles.headerTitle}>Praktikum Pemrograman Mobile</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Soal 1: InfoCard */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Soal 1: Komponen InfoCard</Text>
          <InfoCard 
            title="Pengembangan Aplikasi Mobile" 
            status="selesai" 
            onPress={() => Alert.alert('Informasi', 'Detail tugas: Selesai dikerjakan.')} 
          />
          <InfoCard 
            title="Praktikum Jaringan Komputer" 
            status="proses" 
            onPress={() => Alert.alert('Informasi', 'Detail tugas: Masih dalam tahap pengerjaan.')} 
          />
        </View>

        {/* Soal 2: Direktori Mahasiswa */}
        <View style={[styles.sectionContainer, { flex: 1 }]}>
          <Text style={styles.sectionTitle}>Soal 2: Direktori Mahasiswa</Text>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama mahasiswa..."
            placeholderTextColor="#94a3b8"
            value={keyword}
            onChangeText={setKeyword}
          />

          <FlatList
            data={filteredMahasiswa}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.studentCard}>
                <View style={styles.avatarBox}>
                  <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.studentName}>{item.nama}</Text>
                  <Text style={styles.studentProdi}>{item.prodi}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerBanner: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  studentCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  studentProdi: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#ef4444',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 14,
  },
});