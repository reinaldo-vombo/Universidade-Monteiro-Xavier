import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
  ArrowLeft, Search, Menu, Phone, X,
} from 'lucide-react';
import { useClickOutside } from '../../../lib/hooks/use-click-outside';
import { Link, navigate } from 'gatsby';
import { useLocation } from '@reach/router'
import { ContactPanel } from './contact-panel';
import { MenuPanel } from './menu-panele';
import { TabButton } from './tab-button';
import { IconButton } from './icon-button';
import { useQueryParams } from '../../../lib/hooks/use-query-params';
import { StaticImage } from 'gatsby-plugin-image';

type Tab = 'search' | 'menu' | 'contact' | null;
const SEARCH_ENABLED_PATHS = ['/exames-de-admissao', '/eventos'];

const spring = { type: 'spring', bounce: 0.18, duration: 0.45 } as const;
export default function ToolbarDynamic() {
  const { search, setSearch } = useQueryParams()
  const [activeTab, setActiveTab] = useState<Tab>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const currentPath = location.pathname;
  const searchEnabled = SEARCH_ENABLED_PATHS.some((p) =>
    currentPath.startsWith(p),
  );

  useEffect(() => {
    setActiveTab(null);
    setSearch('');
  }, [currentPath]);

  useEffect(() => {
    if (activeTab === 'search') {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [activeTab]);

  useClickOutside(containerRef, () => setActiveTab(null));

  const toggle = (tab: Tab) =>
    setActiveTab((prev) => (prev === tab ? null : tab));

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else navigate('/');
  };


  const pillWidth = activeTab === 'search' ? 280 : 'auto';

  return (
    <MotionConfig transition={spring}>
      <AnimatePresence>
        {(activeTab === 'menu' || activeTab === 'contact') && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setActiveTab(null)}
          />
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 sm:hidden"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'menu' && (
            <MenuPanel
              onClose={() => setActiveTab(null)}
              currentPath={currentPath}
            />
          )}
          {activeTab === 'contact' && (
            <ContactPanel onClose={() => setActiveTab(null)} />
          )}
        </AnimatePresence>
        <motion.div
          animate={{ width: pillWidth }}
          initial={false}
          className="rounded-2xl border border-zinc-950/10 bg-white
                     shadow-lg shadow-black/10 overflow-hidden"
          style={{ minWidth: 'auto' }}
        >
          <div className="flex items-center gap-1 p-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {activeTab === 'search' ? (
                <motion.div
                  key="search-open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex w-full items-center gap-1"
                >

                  <IconButton
                    onClick={() => {
                      setActiveTab(null);
                      setSearch('');
                    }}
                    ariaLabel="Fechar pesquisa"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </IconButton>
                  <input
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar…"
                    className="h-9 flex-1 min-w-0 rounded-xl border border-zinc-950/10
                               bg-zinc-50 px-3 text-sm text-zinc-900
                               placeholder-zinc-400 focus:outline-none
                               focus:ring-1 focus:ring-zinc-300"
                  />
                  <AnimatePresence>
                    {search && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.15 }}
                      >
                        <IconButton
                          onClick={() => setSearch('')}
                          ariaLabel="Limpar"
                        >
                          <X className="h-3.5 w-3.5" />
                        </IconButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              ) : (

                <motion.div
                  key="tabs-normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <IconButton onClick={goBack} ariaLabel="Voltar">
                    <ArrowLeft className="h-4 w-4" />
                  </IconButton>
                  <div className="h-5 w-px bg-zinc-200 mx-0.5" />
                  <TabButton
                    active={activeTab === 'search'}
                    disabled={!searchEnabled}
                    onClick={() => searchEnabled && toggle('search')}
                    ariaLabel="Pesquisar"
                    tooltip={!searchEnabled ? 'Disponível em Eventos e Exames' : undefined}
                  >
                    <Search className="h-4 w-4" />
                  </TabButton>
                  <IconButton ariaLabel="Home page">
                    <Link to='/'>
                      <StaticImage
                        width={50}
                        height={50}
                        src='../../../images/logo-black.png'
                        alt='logo' />

                    </Link>
                  </IconButton>
                  <TabButton
                    active={activeTab === 'menu'}
                    onClick={() => toggle('menu')}
                    ariaLabel="Menu"
                  >
                    <Menu className="h-4 w-4" />
                  </TabButton>

                  <TabButton
                    active={activeTab === 'contact'}
                    onClick={() => toggle('contact')}
                    ariaLabel="Contacto"
                  >
                    <Phone className="h-4 w-4" />
                  </TabButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}



