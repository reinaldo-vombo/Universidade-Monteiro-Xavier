// hooks/useNavigateWithTransition.ts
import { navigate } from 'gatsby';

export function useNavigateWithTransition() {
  return (to: string) => {
    // Sem suporte → navega normal
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }

    // A ordem certa: startViewTransition PRIMEIRO, navigate DENTRO
    document.startViewTransition(() => {
      navigate(to);
      // window.location.href = to;
    });
  };
}
