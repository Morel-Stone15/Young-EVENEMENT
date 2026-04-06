// CONFIGURATION SUPABASE
// Remplacez ces valeurs par vos propres clés Supabase
const SUPABASE_URL = 'https://mknrohbctrfstvaofcni.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rbnJvaGJjdHJmc3R2YW9mY25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDk3NzMsImV4cCI6MjA5MTA4NTc3M30.287gs5aho6Q1aWNYEVFf-vl_0vjw6WoA1UCj7JZreI4';

const supabaseClient = (typeof supabase !== 'undefined') ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DB = {
  TABLE: 'ye_inscrits_2026',

  async load() {
    if (!supabaseClient) {
      console.error("Supabase SDK non chargé");
      return [];
    }
    try {
      const { data, error } = await supabaseClient
        .from(this.TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Erreur de chargement Cloud:", e);
      return [];
    }
  },

  async add(entry) {
    if (!supabaseClient) return;
    try {
      const { error } = await supabaseClient
        .from(this.TABLE)
        .insert([entry]);

      if (error) throw error;
    } catch (e) {
      console.error("Erreur d'ajout Cloud:", e);
      throw e;
    }
  },

  async remove(id) {
    if (!supabaseClient) return;
    try {
      const { error } = await supabaseClient
        .from(this.TABLE)
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.error("Erreur de suppression Cloud:", e);
      throw e;
    }
  },

  async count() {
    if (!supabaseClient) return 0;
    const { count, error } = await supabaseClient
      .from(this.TABLE)
      .select('*', { count: 'exact', head: true });
    return error ? 0 : count;
  },

  async etablissements() {
    const data = await this.load();
    return [...new Set(data.map(e => e.lycee))].filter(Boolean).length;
  }
};
