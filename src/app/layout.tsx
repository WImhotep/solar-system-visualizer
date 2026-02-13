// app/layout.tsx
import React from 'react';
import './globals.css'; // 引入全局样式文件（如果有的话）

export default function RootLayout({
  children, // 页面内容
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Solar System Visualizer</h1>
          {/* 可以添加头部导航等内容 */}
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2025 Solar System Visualizer</p>
        </footer>
      </body>
    </html>
  );
}
