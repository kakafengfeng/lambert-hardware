"use client";

import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, LANGS, SOURCE } from "./data";
import { cn } from "@/lib/utils";

const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

/**
 * 桌面端页眉：absolute 定位（随页面滚走），初始透明白字；
 * hover 整条变为米色底、logo 与文字反为深棕；导航 hover 展开全宽巨型下拉。
 * 移动端（<lg）：白色 fixed 顶栏 + 汉堡按钮 + 全屏滑入菜单。
 */
export function SiteHeader() {
  const [headerHot, setHeaderHot] = useState(false); // 整条 header hover / 有下拉展开
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  const hot = headerHot || openMenu !== null || searchOpen;
  const darkText = hot; // 米色底时用深棕文字

  return (
    <>
      {/* ============ 桌面端 ============ */}
      <header
        className={cn(
          "absolute left-0 top-0 z-50 hidden w-full transition-colors duration-300 lg:block",
          hot ? "bg-[rgba(244,226,215,0.9)]" : "bg-transparent"
        )}
        onMouseEnter={() => setHeaderHot(true)}
        onMouseLeave={() => {
          setHeaderHot(false);
          setOpenMenu(null);
          setLangOpen(false);
        }}
      >
        <div className="flex h-20 items-center justify-between px-[3%]">
          {/* Logo（白/深双版切换） */}
          <a href={SOURCE} className="relative block h-10 w-[172px] shrink-0">
            <img
              src={`${ASSET}/2026/06/054d37d8deptqjw5.png`}
              alt="木里木外MULI"
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                darkText ? "opacity-0" : "opacity-100"
              )}
            />
            <img
              src={`${ASSET}/2026/06/ba90262f643obwrk.png`}
              alt="木里木外MULI"
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                darkText ? "opacity-100" : "opacity-0"
              )}
            />
          </a>

          {/* 导航 */}
          <nav className="flex h-full items-center">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => {
                  setSearchOpen(false);
                  setOpenMenu(item.children.length > 0 ? item.label : null);
                }}
              >
                <a
                  href={item.href}
                  className={cn(
                    "relative px-6 text-[15px] tracking-widest transition-colors",
                    darkText ? "text-muli-brown" : "text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-6 right-6 h-px origin-left scale-x-0 bg-muli-camel transition-transform duration-300",
                      openMenu === item.label && "scale-x-100"
                    )}
                  />
                </a>
              </div>
            ))}
          </nav>

          {/* 右侧：语言 + 搜索 */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 text-[15px] tracking-widest",
                  darkText ? "text-muli-brown" : "text-white"
                )}
              >
                中文
                <ChevronDown size={14} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full pt-3">
                  <div className="w-32 bg-white py-2 shadow-lg">
                    {LANGS.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="block px-4 py-2 text-sm text-muli-brown hover:bg-muli-beige"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="搜索"
              onClick={() => {
                setOpenMenu(null);
                setSearchOpen((v) => !v);
              }}
              className={cn(
                "transition-colors",
                darkText ? "text-muli-brown" : "text-white"
              )}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* 全宽巨型下拉 */}
        {openMenu && (
          <div key={openMenu} className="muli-menu-in absolute left-0 top-full w-full bg-[rgba(244,226,215,0.95)]">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-x-14 gap-y-4 px-[3%] py-10">
              {NAV_ITEMS.find((n) => n.label === openMenu)?.children.map(
                (sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="text-lg tracking-widest text-muli-brown transition-colors hover:text-muli-camel"
                  >
                    {sub.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}

        {/* 全宽搜索面板 */}
        {searchOpen && (
          <div className="absolute left-0 top-full w-full bg-[rgba(244,226,215,0.97)]">
            <div className="mx-auto max-w-4xl px-[3%] py-14">
              <p className="mb-6 text-center text-2xl tracking-[0.3em] text-muli-brown">
                全站搜索
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-4 border-b border-muli-brown/40 pb-4"
              >
                <Search size={24} className="shrink-0 text-muli-brown" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="输入关键词查询"
                  className="w-full bg-transparent text-xl text-muli-brown placeholder:text-muli-brown/40 focus:outline-none"
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* ============ 移动端 ============ */}
      <header className="fixed left-0 top-0 z-50 flex h-[59px] w-full items-center justify-between bg-white px-5 lg:hidden">
        <a href={SOURCE} className="block h-8 w-[140px]">
          <img
            src={`${ASSET}/2026/06/ba90262f643obwrk.png`}
            alt="木里木外MULI"
            className="h-full w-full object-contain"
          />
        </a>
        <button
          type="button"
          aria-label="打开菜单"
          onClick={() => setMobileOpen(true)}
          className="text-muli-brown"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* 移动端全屏菜单 */}
      {mobileOpen && (
        <div className="muli-mobile-in fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
          <div className="flex h-[59px] items-center justify-between px-5">
            <span className="block h-8 w-[140px]">
              <img
                src={`${ASSET}/2026/06/ba90262f643obwrk.png`}
                alt="木里木外MULI"
                className="h-full w-full object-contain"
              />
            </span>
            <button
              type="button"
              aria-label="关闭菜单"
              onClick={() => setMobileOpen(false)}
              className="text-muli-brown"
            >
              <X size={26} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-8 py-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-muli-beige">
                <div className="flex items-center justify-between py-4">
                  <a
                    href={item.href}
                    className="text-lg tracking-widest text-muli-brown"
                    onClick={() => {
                      if (item.children.length === 0) setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                  {item.children.length > 0 && (
                    <button
                      type="button"
                      aria-label="展开子菜单"
                      onClick={() =>
                        setMobileSub((s) => (s === item.label ? null : item.label))
                      }
                      className="text-muli-camel"
                    >
                      <ChevronDown
                        size={20}
                        className={cn(
                          "transition-transform",
                          mobileSub === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {mobileSub === item.label && (
                  <div className="pb-4 pl-4">
                    {item.children.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-[15px] text-muli-brown/70"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-3 py-6">
              {LANGS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="border border-muli-camel/40 px-4 py-1.5 text-sm text-muli-brown"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
