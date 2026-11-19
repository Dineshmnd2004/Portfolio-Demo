/* Skill / social icons (inline SVG, no external files).
   To add a logo for a new skill, add a line to the I = { ... } list below
   using S() for outline icons, F() for filled icons or M('AB',size) for a monogram badge. */
(function () {
   var S = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>' },
      F = function (d) { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + d + '</svg>' },
      M = function (t, z, sh) { return F((sh || '<rect x="2" y="2" width="20" height="20" rx="4"/>') + '<text x="12" y="' + (12 + z * .36) + '" text-anchor="middle" font-size="' + z + '" font-weight="800" font-family="system-ui,sans-serif" style="fill:var(--ib)">' + t + '</text>') },
      sh = '<path d="M3 2h18l-1.6 17.5L12 22l-7.4-2.5z"/>',
      py = 'M12 2C7.6 2 7.9 3.9 7.9 3.9V6h4.2v.7H6.2S3 6.4 3 11c0 4.6 2.8 4.4 2.8 4.4h1.7v-2.1s-.1-2.8 2.7-2.8h4.5s2.6.1 2.6-2.5V4.6S17.7 2 12 2zM9.4 3.5a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z',
      I = {
         'Python': F('<path fill-rule="evenodd" d="' + py + '"/><path fill-rule="evenodd" opacity=".6" transform="rotate(180 12 12)" d="' + py + '"/>'),
         'C (Basics)': M('C', 14), 'JavaScript': M('JS', 10.5), 'SQL': M('SQL', 8),
         'React.js': S('<circle cx="12" cy="12" r="1.8" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>'),
         'HTML': M('5', 13, sh), 'CSS': M('3', 13, sh),
         'Flask': S('<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.200 21h11.600a2 2 0 0 0 1.700-2.500L14 9V3M7.500 15h9"/>'),
         'PHP': M('php', 8.5, '<ellipse cx="12" cy="12" rx="10.500" ry="6.500"/>'),
         'MySQL': M('My', 9.5),
         'MongoDB': F('<path d="M12 2c3.500 3.200 5 6 5 9.500 0 3.300-2 5.800-5 7.500-3-1.700-5-4.200-5-7.500C7 8 8.500 5.200 12 2z"/><path d="M12 19v3" stroke="currentColor" stroke-width="1.600"/><path d="M12 5v13" style="stroke:var(--ib)" stroke-width="1"/>'),
         'Database Design': S('<ellipse cx="12" cy="5.500" rx="8" ry="3"/><path d="M4 5.500v13c0 1.700 3.600 3 8 3s8-1.300 8-3v-13M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3"/>'),
         'Query Optimization': S('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
         'GitHub': F('<path d="M12 .5a11.5 11.5 0 0 0-3.640 22.410c.580.100.790-.250.790-.560v-2c-3.200.700-3.880-1.370-3.880-1.370-.520-1.330-1.280-1.690-1.280-1.690-1.040-.710.080-.700.080-.700 1.150.080 1.760 1.180 1.760 1.180 1.030 1.760 2.690 1.250 3.350.960.100-.740.400-1.250.730-1.540-2.550-.290-5.240-1.280-5.240-5.690 0-1.260.450-2.280 1.180-3.090-.120-.290-.510-1.460.110-3.050 0 0 .970-.310 3.170 1.180a11 11 0 0 1 5.780 0c2.200-1.490 3.170-1.180 3.170-1.180.620 1.590.230 2.760.110 3.050.740.810 1.180 1.830 1.180 3.090 0 4.420-2.690 5.390-5.250 5.680.410.360.780 1.060.780 2.140v3.170c0 .310.210.670.800.560A11.500 11.500 0 0 0 12 .5z"/>'),
         'VS Code': S('<path d="M17 3 8.500 11.500 4.500 8.500 3 9.500v5l1.500 1 4-3L17 21l4-2V5zM17 3v18"/>'),
         'Excel': M('X', 14), 'Word': M('W', 13), 'PowerPoint': M('P', 14),
         'CNN': S('<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6.500l3.200 4M7 17.500l3.200-4M14 11l3.200-3.600M14 13l3.200 3.600"/>'),
         'OpenCV': S('<path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
         'Random Forest': S('<path d="M12 22v-8M12 14 7 10M12 14l5-4M12 10V6"/><circle cx="12" cy="4.500" r="2"/><circle cx="6" cy="8.500" r="2"/><circle cx="18" cy="8.500" r="2"/>'),
         'SVM': S('<path d="M3 21 21 3"/><circle cx="6" cy="7" r="1.500" fill="currentColor"/><circle cx="10" cy="4.500" r="1.500" fill="currentColor"/><circle cx="7" cy="12" r="1.500" fill="currentColor"/><circle cx="17" cy="19" r="1.500"/><circle cx="20" cy="13" r="1.500"/><circle cx="13" cy="17" r="1.500"/>'),
         'Logistic Regression': S('<path d="M3 3v18h18M5 18c6 0 5-11 10-11h5"/>'),
         'Apriori Algorithm': S('<path d="M3 9h18l-2 11H5zM8 9l3-6M16 9l-3-6"/>'),
         'Teamwork': S('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.500 2.700-6 6-6s6 2.500 6 6"/><circle cx="17" cy="9" r="2.500"/><path d="M16.500 14c3 0 4.500 2 4.500 5"/>'),
         'Time Management': S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>'),
         'Communication': S('<path d="M4 4h16v12H9l-5 4zM8 9h8M8 12h5"/>'),
         'Problem Solving': S('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.600.500 1 1.200 1 2.100h5c0-.900.400-1.600 1-2.100A6 6 0 0 0 12 3z"/>')
      };
   I.LinkedIn = F('<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3V9.75zm6.5 0h3.8v1.6h.06c.53-1 1.82-2.06 3.75-2.06 4 0 4.74 2.63 4.74 6.05v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.32h-4V9.75z"/>');
   I.Mail = S('<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="m3 7 9 6.5L21 7"/>');
   window.ICONS = I; window.ICON_M = M;
})();
