import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../styles/colors';

export default function UserCreateScreen() {
  const [role, setRole] = useState<'professor' | 'aluno'>('professor');

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {role === 'professor' ? 'Cadastrar professor' : 'Cadastrar estudante'}
          </Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para criar um novo acesso.
          </Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, role === 'professor' && styles.tabActive]} 
              onPress={() => setRole('professor')}
            >
              <Text style={[styles.tabText, role === 'professor' && styles.tabTextActive]}>Professor</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, role === 'aluno' && styles.tabActive]} 
              onPress={() => setRole('aluno')}
            >
              <Text style={[styles.tabText, role === 'aluno' && styles.tabTextActive]}>Estudante</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput style={styles.input} placeholder="Ex: João Silva" />

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="exemplo@escola.com" keyboardType="email-address" />

          <Text style={styles.label}>Senha inicial</Text>
          <TextInput style={styles.input} placeholder="Mínimo 6 caracteres" secureTextEntry />

          <Text style={styles.label}>{role === 'professor' ? 'Departamento / Disciplina' : 'Turma'}</Text>
          <TextInput style={styles.input} placeholder={role === 'professor' ? "Ex: Matemática" : "Ex: 9º Ano A"} />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.btnCancel}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.btnSubmitText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, width: '100%', maxWidth: 500, alignSelf: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#F0F2F5', borderRadius: 8, padding: 4, marginBottom: 24 },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666' },
  tabTextActive: { color: '#FFF' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 32, gap: 12 },
  btnCancel: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB' },
  btnCancelText: { color: '#666', fontWeight: '600' },
  btnSubmit: { backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  btnSubmitText: { color: '#FFF', fontWeight: '600' }
});