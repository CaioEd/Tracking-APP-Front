import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/index.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { AuthProvider } from './context/general.tsx'


createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<ThemeProvider>
				<AppRoutes />
		</ThemeProvider>
	</AuthProvider>
)
