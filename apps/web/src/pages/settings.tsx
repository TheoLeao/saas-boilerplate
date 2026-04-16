import { useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth.store';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export function SettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch('/users/me', form);
      await fetchUser();
      toast.success('Profil mis à jour');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Échec de la mise à jour';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const update =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Informations personnelles</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="Prénom"
              value={form.firstName}
              onChange={update('firstName')}
            />
            <Input
              id="lastName"
              label="Nom"
              value={form.lastName}
              onChange={update('lastName')}
            />
          </div>
          <Input label="Email" value={user?.email || ''} disabled />
          <Button onClick={handleSave} loading={loading}>
            Enregistrer
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zone de danger</CardTitle>
          <CardDescription>Actions irréversibles</CardDescription>
        </CardHeader>
        <Button variant="danger">Supprimer le compte</Button>
      </Card>
    </div>
  );
}
