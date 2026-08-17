"use client";

import { useEffect, useId, useRef, useState } from "react";

export type LawSelectOption = { value: string; label: string };

export function LawSelect({
  label,
  value,
  options,
  onChange,
  menuMaxHeight = 480
}: {
  label: string;
  value: string;
  options: LawSelectOption[];
  onChange: (value: string) => void;
  menuMaxHeight?: number;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(Math.max(0, options.findIndex((option) => option.value === value)));
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(480);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const current = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const space = window.innerHeight - rect.bottom - 24;
      setMaxHeight(Math.max(180, Math.min(space, menuMaxHeight)));
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    const onDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [menuMaxHeight, open]);

  useEffect(() => {
    if (!open || !keyboardNav) return;
    const item = listRef.current?.children[active] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [active, open, keyboardNav]);

  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setActive(index);
    setOpen(false);
  };

  const onTriggerKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        setActive(Math.max(0, options.findIndex((option) => option.value === value)));
        setOpen(true);
        return;
      }
    }
    if (!open) return;
    setKeyboardNav(true);
    if (event.key === "ArrowDown") setActive((index) => Math.min(options.length - 1, index + 1));
    if (event.key === "ArrowUp") setActive((index) => Math.max(0, index - 1));
    if (event.key === "Enter" || event.key === " ") choose(active);
    if (event.key === "Home") setActive(0);
    if (event.key === "End") setActive(options.length - 1);
  };

  return (
    <div className="law-select" ref={rootRef}>
      <span className="law-select__label" id={`${id}-label`}>{label}</span>
      <button
        ref={triggerRef}
        type="button"
        className={`law-select__trigger${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => {
          setKeyboardNav(false);
          if (!open) setActive(Math.max(0, options.findIndex((option) => option.value === value)));
          setOpen((state) => !state);
        }}
        onKeyDown={onTriggerKey}
      >
        <span id={`${id}-value`}>{current?.label}</span>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      {open ? (
        <ul className="law-select__list" role="listbox" ref={listRef} aria-labelledby={`${id}-label`} tabIndex={-1} data-lenis-prevent style={{ maxHeight }} onWheel={(event) => event.stopPropagation()}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`law-select__option${index === active ? " is-active" : ""}${option.value === value ? " is-selected" : ""}`}
              onMouseEnter={() => { setKeyboardNav(false); setActive(index); }}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              {option.value === value ? <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
